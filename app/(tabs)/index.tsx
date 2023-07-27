import { AntDesign } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useNavigation } from 'expo-router';
import { observer } from 'mobx-react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';
import { ContextMenuView, ContextMenuButton } from 'react-native-ios-context-menu';

import { ProgressCircle } from '../../core/components/ProgressCircle';
import { Text } from '../../core/components/Text';
import { View } from '../../core/components/View';
import { defaultPreviewConfig } from '../../core/helpers/contextMenu';
import { formatTimerValue, getTimerItems } from '../../core/helpers/timer';
import { useHaptics } from '../../core/hooks/useHaptics';
import { useNotifications } from '../../core/hooks/useNotifications';
import { useTimer } from '../../core/hooks/useTimer';
import tasksStore from '../../core/models/tasksStore';
import { useTheme } from '../../core/providers/ThemeProvider';
import rootStore from '../../core/rootStore';

const HomeScreen = () => {
  const { getTaskById, currentTaskId, setCurrentTaskId, doneTask, getCategoryById } = tasksStore;
  const { focusLoops, focusDuration, shortBreakDuration, longBreakDuration } = rootStore;

  const { scheduleNotification } = useNotifications();
  const { notification } = useHaptics();

  const [currentTimerIndex, setCurrentTimerIndex] = useState(0);

  const timerItems = useMemo(() => {
    return getTimerItems(focusLoops);
  }, [focusLoops]);

  const timerDuration = useMemo(() => {
    const type = timerItems[currentTimerIndex];
    if (type === 'shortBreak') {
      return shortBreakDuration;
    }
    if (type === 'longBreak') {
      return longBreakDuration;
    }
    return focusDuration;
  }, [currentTimerIndex, timerItems]);

  const handleNextTimer = async () => {
    scheduleNotification({
      title: t(`notifications.timeOver.${timerItems[currentTimerIndex] ?? 'focus'}.title`),
      body: t(`notifications.timeOver.${timerItems[currentTimerIndex] ?? 'focus'}.body`),
    });
    notification();
    setCurrentTimerIndex((index) => {
      if (index === timerItems.length - 1) {
        return 0;
      }
      return index + 1;
    });
  };

  const handleResetToDefault = () => {
    controls.reset();
    setCurrentTaskId();
    setCurrentTimerIndex(0);
  };

  const { controls, isPlay, isStarted, elapsedTime } = useTimer(timerDuration, handleNextTimer);

  useEffect(() => {
    controls.reset();
  }, [currentTaskId]);

  const { t } = useTranslation();
  const { colors } = useTheme();
  const navigation = useNavigation();

  const scheduledTask = useMemo(() => {
    if (currentTaskId) {
      return getTaskById(currentTaskId) ?? null;
    }
    return null;
  }, [currentTaskId, getTaskById]);

  const category = useMemo(
    () => (scheduledTask?.categoryId ? getCategoryById(scheduledTask.categoryId) : null),
    [scheduledTask, getCategoryById]
  );

  const handleTaskMenuAction: React.ComponentProps<typeof ContextMenuView>['onPressMenuItem'] = ({
    nativeEvent: { actionKey },
  }) => {
    if (actionKey === 'move-to-inbox') {
      setCurrentTaskId();
    }
    if (actionKey === 'done' && currentTaskId) {
      doneTask(currentTaskId);
      setCurrentTaskId();
    }
  };

  const handleControlMenuAction: React.ComponentProps<
    typeof ContextMenuButton
  >['onPressMenuItem'] = ({ nativeEvent: { actionKey } }) => {
    if (actionKey === 'control-next') {
      controls.reset();
      handleNextTimer();
    }
    if (actionKey === 'control-reset') {
      controls.reset();
    }
  };

  const controlContextMenuConfig: React.ComponentProps<typeof ContextMenuButton>['menuConfig'] = {
    menuTitle: '',
    menuItems: [
      {
        type: 'menu',
        menuTitle: '',
        menuOptions: ['displayInline'],
        menuItems: [
          {
            actionKey: 'control-next',
            actionTitle: t('home.controlContextMenu.next'),
            menuAttributes: timerItems[currentTimerIndex] === 'focus' ? ['disabled'] : [],
            icon: {
              type: 'IMAGE_SYSTEM',
              imageValue: {
                systemName: 'forward',
              },
            },
          },
          {
            actionKey: 'control-reset',
            actionTitle: t('home.controlContextMenu.reset'),
            menuAttributes: isStarted ? [] : ['disabled'],
            icon: {
              type: 'IMAGE_SYSTEM',
              imageValue: {
                systemName: 'stop',
              },
            },
          },
        ],
      },
    ],
  };

  const currentTaskMenuConfig: React.ComponentProps<typeof ContextMenuView>['menuConfig'] = {
    menuTitle: '',
    menuItems: [
      {
        type: 'menu',
        menuTitle: '',
        menuOptions: ['displayInline'],
        menuItems: [
          {
            actionKey: 'move-to-inbox',
            actionTitle: t('home.actionsMenu.moveToInbox'),
            icon: {
              type: 'IMAGE_SYSTEM',
              imageValue: {
                systemName: 'tray.and.arrow.down.fill',
              },
            },
          },
          {
            actionKey: 'done',
            actionTitle: t('home.actionsMenu.done'),
            icon: {
              type: 'IMAGE_SYSTEM',
              imageValue: {
                systemName: 'checkmark',
              },
            },
          },
        ],
      },
    ],
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () =>
        scheduledTask ? (
          <ContextMenuView
            previewConfig={defaultPreviewConfig}
            menuConfig={currentTaskMenuConfig}
            onPressMenuItem={handleTaskMenuAction}>
            <View ph="xl" pv="s">
              <Text align="center" type="labelLarge" text={scheduledTask.name} />
              {!!category && (
                <Text
                  align="center"
                  type="bodySmall"
                  color="secondary"
                  mt="xs"
                  text={category.name}
                />
              )}
            </View>
          </ContextMenuView>
        ) : null,
      headerRight: () => (
        <Pressable onPress={handleResetToDefault}>
          {({ pressed }) => (
            <AntDesign
              name="reload1"
              size={25}
              color={colors.primary}
              style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
            />
          )}
        </Pressable>
      ),
    });
  }, [
    colors,
    handleResetToDefault,
    scheduledTask,
    category,
    defaultPreviewConfig,
    currentTaskMenuConfig,
    handleTaskMenuAction,
  ]);

  return (
    <View useSafeArea ph="l" color="background" flex={1}>
      <View flex={1} justifyContent="center">
        <Text
          align="center"
          type="bodyLarge"
          color="secondary"
          mb="l"
          text={t(`common.timerTitle.${timerItems[currentTimerIndex] ?? 'focus'}`)}
        />
        <Text align="center" type="headlineExtraLarge" text={formatTimerValue(elapsedTime)} />
        <View row justifyContent="center" mt="s">
          {timerItems.map((type, index) => {
            if (type !== 'focus') {
              return null;
            }
            let circleType: React.ComponentProps<typeof ProgressCircle>['type'] = 'idle';
            if (index === currentTimerIndex && isStarted) {
              circleType = 'inProgress';
            }
            if (index < currentTimerIndex) {
              circleType = 'finished';
            }
            return <ProgressCircle key={index} type={circleType} />;
          })}
        </View>

        <View mt="xxl" justifyContent="center" row>
          <ContextMenuButton
            menuConfig={controlContextMenuConfig}
            onPressMenuItem={handleControlMenuAction}>
            {isPlay ? (
              <Pressable onPress={() => controls.play(false)}>
                {({ pressed }) => (
                  <AntDesign
                    name="pause"
                    size={60}
                    color={colors.primary}
                    style={{ opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            ) : (
              <Pressable onPress={() => controls.play(true)}>
                {({ pressed }) => (
                  <AntDesign
                    name="play"
                    size={60}
                    color={colors.primary}
                    style={{ opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            )}
          </ContextMenuButton>
        </View>
      </View>
    </View>
  );
};

export default observer(HomeScreen);
