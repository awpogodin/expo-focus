import { AntDesign } from '@expo/vector-icons';
import { MenuView, NativeActionEvent } from '@react-native-menu/menu';
import { intervalToDuration } from 'date-fns';
import { useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, Pressable } from 'react-native';
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

export default function HomeScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const navigation = useNavigation();

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

  const handleTaskMenuAction = ({ nativeEvent }: NativeActionEvent) => {
    const selectedActionId = nativeEvent.event;
    console.log('selectedId = ', selectedActionId);
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

  return (
    <View ph="l" color="background" flex={1}>
      <MenuView
        onPressAction={handleTaskMenuAction}
        actions={[
          {
            title: '',
            displayInline: true,
            subactions: [
              {
                id: 'move-to-inbox',
                title: t('home.actionsMenu.moveToInbox'),
                image: Platform.select({
                  ios: 'tray.and.arrow.down.fill',
                  android: 'ic_menu_add',
                }),
              },
              {
                id: 'done',
                title: t('home.actionsMenu.done'),
                imageColor: colors.success,
                image: Platform.select({
                  ios: 'checkmark',
                  android: 'ic_menu_add',
                }),
              },
            ],
          },
          {
            id: 'clear',
            title: t('home.actionsMenu.remove'),
            attributes: {
              destructive: true,
            },
            imageColor: colors.danger,
            image: Platform.select({
              ios: 'trash',
              android: 'ic_menu_delete',
            }),
          },
        ]}>
        <Pressable>
          {({ pressed }) => (
            <View style={{ opacity: pressed ? 0.5 : 1 }}>
              <Text align="center" type="labelLarge" text="Задача 1" mt="xl" />
              <Text align="center" type="bodySmall" color="secondary" mt="xs" text="Работа" />
            </View>
          )}
        </Pressable>
      </MenuView>
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
}
