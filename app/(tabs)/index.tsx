import { AntDesign } from '@expo/vector-icons';
import { intervalToDuration } from 'date-fns';
import { useNavigation } from 'expo-router';
import { observer } from 'mobx-react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActionSheetIOS, Pressable } from 'react-native';
import { ContextMenuView } from 'react-native-ios-context-menu';
import Animated, {
  cancelAnimation,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  runOnJS,
  useDerivedValue,
} from 'react-native-reanimated';
import { withPause } from 'react-native-redash';

import { ProgressCircle } from '../../core/components/ProgressCircle';
import { Text } from '../../core/components/Text';
import { View } from '../../core/components/View';
import tasksStore from '../../core/models/tasksStore';
import { useTheme } from '../../core/providers/ThemeProvider';

const AnimatedText = Animated.createAnimatedComponent(Text);

const formatNumber = (value: number) => ('0' + value).slice(-2);

const getFormattedValue = (value: number) => {
  const { minutes, seconds } = intervalToDuration({
    start: 0,
    end: Math.ceil(value / 1000) * 1000,
  });
  return `${formatNumber(minutes ?? 0)}:${formatNumber(seconds ?? 0)}`;
};

const HomeScreen = () => {
  const { getTaskById, currentTaskId, setCurrentTaskId, doneTask, getCategoryById } = tasksStore;

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

  // region timer

  // начальное значение таймера в мс
  const [initialTimer, setInitialTimer] = useState(10000);
  const [elapsedTime, setElapsedTime] = useState(initialTimer);

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
  };

  const updateElapsedTime = (val: number) => {
    setElapsedTime(val);
    if (val === 0) {
      controls.reset();
    }
  };

  useDerivedValue(() => {
    runOnJS(updateElapsedTime)(animElapsedTime.value);
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

  // if (elapsedTime === 0) {
  //   setTimeout(() => {
  //     controls.reset();
  //   });
  // }
  // endregion

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
  }, []);

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
        <ContextMenuView menuConfig={currentTaskMenuConfig} onPressMenuItem={handleTaskMenuAction}>
          <Pressable>
            <View pv="l">
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
          </Pressable>
        </ContextMenuView>
      )}
      <View flex={1} justifyContent="center">
        <Text align="center" type="bodyLarge" color="secondary" text={t('home.title')} />
        <AnimatedText
          align="center"
          type="headlineExtraLarge"
          mt="l"
          text={getFormattedValue(elapsedTime)}
        />
        <View row justifyContent="center" mt="s">
          <ProgressCircle type="finished" />
          <ProgressCircle type="inProgress" />
          <ProgressCircle type="idle" />
          <ProgressCircle type="idle" />
        </View>

        <View mt="xxl" justifyContent="center" row>
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
        </View>
      </View>
    </View>
  );
};

export default observer(HomeScreen);
