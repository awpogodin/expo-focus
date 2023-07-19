import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { observer } from 'mobx-react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet } from 'react-native';
import { ContextMenuView, ContextMenuButton } from 'react-native-ios-context-menu';
import {
  cancelAnimation,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  runOnJS,
  useDerivedValue,
} from 'react-native-reanimated';
import { ReText, withPause } from 'react-native-redash';

import { ProgressCircle } from '../../core/components/ProgressCircle';
import { Text } from '../../core/components/Text';
import { View } from '../../core/components/View';
import { defaultPreviewConfig } from '../../core/helpers/contextMenu';
import { getMsFromMinutes } from '../../core/helpers/timer';
import tasksStore from '../../core/models/tasksStore';
import { useTheme } from '../../core/providers/ThemeProvider';
import rootStore from '../../core/rootStore';

const HomeScreen = () => {
  const { getTaskById, currentTaskId, setCurrentTaskId, doneTask, getCategoryById } = tasksStore;
  const {
    timerDuration,
    nextTimerItem,
    resetTimerIndex,
    currentTimerItem,
    timerItems,
    currentTimerIndex,
    focusLoops,
  } = rootStore;

  const { t } = useTranslation();
  const { colors, typography } = useTheme();
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
      controls.next();
    }
    if (actionKey === 'control-reset') {
      controls.reset();
    }
  };

  // region timer

  useEffect(() => {
    setInitialTimer(getMsFromMinutes(timerDuration));
    controls.reset();
  }, [timerDuration]);

  useEffect(() => {
    resetTimerIndex();
    controls.reset();
  }, [currentTaskId, focusLoops]);

  // начальное значение таймера в мс
  const [initialTimer, setInitialTimer] = useState(getMsFromMinutes(timerDuration));

  // запущен ли таймер
  const [isPlay, setIsPlay] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const animElapsedTime = useSharedValue(initialTimer);
  const animPaused = useSharedValue(false);

  const controls = {
    play: (value: boolean) => {
      setIsPlay(value);
      animPaused.value = !value;
      if (value && !isStarted) {
        startAnimation();
        setIsStarted(true);
      }
    },
    reset: () => {
      setIsPlay(false);
      setIsStarted(false);
      cancelAnimation(animElapsedTime);
      animElapsedTime.value = initialTimer;
    },
    next: () => {
      setIsPlay(false);
      setIsStarted(false);
      cancelAnimation(animElapsedTime);
      animElapsedTime.value = initialTimer;
      nextTimerItem();
    },
  };

  const elapsedTime = useDerivedValue(() => {
    // Останавливаем таймер, если время вышло
    if (animElapsedTime.value === 0) {
      runOnJS(controls.next)();
    }
    const getTime = (ms: number) => {
      const min = Math.floor((ms / 1000 / 60) << 0).toString();
      const sec = Math.floor((ms / 1000) % 60).toString();
      return { min: min.length === 1 ? `0${min}` : min, sec: sec.length === 1 ? `0${sec}` : sec };
    };
    const { min, sec } = getTime(animElapsedTime.value);
    return `${min}:${sec}`;
  });

  const startAnimation = () => {
    animElapsedTime.value = withPause(
      withRepeat(
        withTiming(0, {
          duration: initialTimer,
          easing: Easing.linear,
        }),
        1
      ),
      animPaused
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={controls.reset}>
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
  }, [colors, controls]);

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
            menuAttributes: currentTimerItem === 'focus' ? ['disabled'] : [],
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
            icon: {
              type: 'IMAGE_SYSTEM',
              imageValue: {
                systemName: 'arrow.counterclockwise',
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

  return (
    <View useSafeArea ph="l" color="background" flex={1}>
      {!!scheduledTask && (
        <View alignSelf="center">
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
        </View>
      )}
      <View flex={1} justifyContent="center">
        <Text
          align="center"
          type="bodyLarge"
          color="secondary"
          mb="l"
          text={t(`common.timerTitle.${currentTimerItem}`)}
        />
        <ReText
          style={StyleSheet.flatten([
            typography.headlineExtraLarge,
            { textAlign: 'center', color: colors.primary },
          ])}
          text={elapsedTime}
        />
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
