import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView } from 'react-native';
import { useMMKV } from 'react-native-mmkv';

import { MenuItem } from '../../core/components/MenuItem';
import { View } from '../../core/components/View';
import rootStore from '../../core/rootStore';

type Item = React.ComponentProps<typeof MenuItem> & {
  id: number;
};

const SettingsScreen: React.FC = () => {
  const { t } = useTranslation();

  const storage = useMMKV();

  const {
    userTheme,
    setUserTheme,
    focusDuration,
    setFocusDuration,
    shortBreakDuration,
    longBreakDuration,
    setShortBreakDuration,
    setLongBreakDuration,
    focusLoops,
    setFocusLoops,
    setIsHapticEnabled,
    isHapticEnabled,
  } = rootStore;

  const items: Item[] = [
    {
      id: 1,
      title: t('settings.items.focusDuration.title'),
      description: t('settings.items.focusDuration.description'),
      value: t('common.minutesShort', { value: focusDuration }),
      onPress: (id: string) => {
        if (id === 'focus-duration-25') {
          setFocusDuration(25);
        }
        if (id === 'focus-duration-30') {
          setFocusDuration(30);
        }
        if (id === 'focus-duration-45') {
          setFocusDuration(45);
        }
        if (id === 'focus-duration-60') {
          setFocusDuration(60);
        }
      },
      menuConfig: {
        menuTitle: '',
        menuItems: [
          {
            type: 'menu',
            menuTitle: '',
            menuOptions: ['displayInline'],
            menuItems: [
              {
                actionKey: 'focus-duration-25',
                actionTitle: t('common.minutesShort', { value: 25 }),
                menuState: focusDuration === 25 ? 'on' : undefined,
              },
              {
                actionKey: 'focus-duration-30',
                actionTitle: t('common.minutesShort', { value: 30 }),
                menuState: focusDuration === 30 ? 'on' : undefined,
              },
              {
                actionKey: 'focus-duration-45',
                actionTitle: t('common.minutesShort', { value: 45 }),
                menuState: focusDuration === 45 ? 'on' : undefined,
              },
              {
                actionKey: 'focus-duration-60',
                actionTitle: t('common.minutesShort', { value: 60 }),
                menuState: focusDuration === 60 ? 'on' : undefined,
              },
            ],
          },
          {
            actionKey: 'focus-duration-custom',
            actionTitle: t('common.configure'),
            menuAttributes: ['disabled'],
            icon: {
              type: 'IMAGE_SYSTEM',
              imageValue: {
                systemName: 'lock.fill',
              },
            },
          },
        ],
      },
    },
    {
      id: 2,
      title: t('settings.items.breaks.title'),
      description: t('settings.items.breaks.description'),
      value: t('common.minutesShort', { value: `${shortBreakDuration}, ${longBreakDuration}` }),
      onPress: (id: string) => {
        if (id === 'short-break-duration-5') {
          setShortBreakDuration(5);
        }
        if (id === 'short-break-duration-10') {
          setShortBreakDuration(10);
        }

        if (id === 'long-break-duration-15') {
          setLongBreakDuration(15);
        }
        if (id === 'long-break-duration-20') {
          setLongBreakDuration(20);
        }
        if (id === 'long-break-duration-30') {
          setLongBreakDuration(30);
        }
      },
      menuConfig: {
        menuTitle: '',
        menuItems: [
          {
            type: 'menu',
            menuTitle: t('common.shortBreak'),
            menuOptions: ['displayInline'],
            menuItems: [
              {
                actionKey: 'short-break-duration-5',
                actionTitle: t('common.minutesShort', { value: 5 }),
                menuState: shortBreakDuration === 5 ? 'on' : undefined,
              },
              {
                actionKey: 'short-break-duration-10',
                actionTitle: t('common.minutesShort', { value: 10 }),
                menuState: shortBreakDuration === 10 ? 'on' : undefined,
              },
              {
                actionKey: 'short-break-duration-custom',
                actionTitle: t('common.configure'),
                menuAttributes: ['disabled'],
                icon: {
                  type: 'IMAGE_SYSTEM',
                  imageValue: {
                    systemName: 'lock.fill',
                  },
                },
              },
            ],
          },
          {
            type: 'menu',
            menuTitle: t('common.longBreak'),
            menuOptions: ['displayInline'],
            menuItems: [
              {
                actionKey: 'long-break-duration-15',
                actionTitle: t('common.minutesShort', { value: 15 }),
                menuState: longBreakDuration === 15 ? 'on' : undefined,
              },
              {
                actionKey: 'long-break-duration-20',
                actionTitle: t('common.minutesShort', { value: 20 }),
                menuState: longBreakDuration === 20 ? 'on' : undefined,
              },
              {
                actionKey: 'long-break-duration-30',
                actionTitle: t('common.minutesShort', { value: 30 }),
                menuState: longBreakDuration === 30 ? 'on' : undefined,
              },
              {
                actionKey: 'long-break-duration-custom',
                actionTitle: t('common.configure'),
                menuAttributes: ['disabled'],
                icon: {
                  type: 'IMAGE_SYSTEM',
                  imageValue: {
                    systemName: 'lock.fill',
                  },
                },
              },
            ],
          },
        ],
      },
    },
    {
      id: 3,
      title: t('settings.items.cycle.title'),
      value: `${focusLoops}`,
      onPress: (id: string) => {
        if (id === 'focus-loops-2') {
          setFocusLoops(2);
        }
        if (id === 'focus-loops-3') {
          setFocusLoops(3);
        }
        if (id === 'focus-loops-4') {
          setFocusLoops(4);
        }
        if (id === 'focus-loops-custom') {
          Alert.prompt(
            t('settings.items.cycle.prompt.title'),
            t('settings.items.cycle.prompt.subTitle'),
            (v) => {
              const value = isNaN(Number(v)) ? 0 : Number(v);
              if (value > 1 && value < 10) {
                setFocusLoops(value);
              }
            },
            'plain-text',
            undefined,
            'numeric'
          );
        }
      },
      menuConfig: {
        menuTitle: '',
        menuItems: [
          {
            type: 'menu',
            menuTitle: '',
            menuOptions: ['displayInline'],
            menuItems: [
              {
                actionKey: 'focus-loops-2',
                actionTitle: '2',
                menuState: focusLoops === 2 ? 'on' : undefined,
              },
              {
                actionKey: 'focus-loops-3',
                actionTitle: '3',
                menuState: focusLoops === 3 ? 'on' : undefined,
              },
              {
                actionKey: 'focus-loops-4',
                actionTitle: '4',
                menuState: focusLoops === 4 ? 'on' : undefined,
              },
            ],
          },
          {
            actionKey: 'focus-loops-custom',
            actionTitle: t('common.configure'),
            menuAttributes: ['disabled'],
            icon: {
              type: 'IMAGE_SYSTEM',
              imageValue: {
                systemName: 'lock.fill',
              },
            },
          },
        ],
      },
      disabled: true,
    },
    {
      id: 4,
      title: t('settings.items.theme.title'),
      description: t('settings.items.theme.description'),
      value: t(`common.themes.${userTheme}`),
      onPress: (id: string) => {
        if (id === 'theme-light') {
          setUserTheme('light');
        }
        if (id === 'theme-dark') {
          setUserTheme('dark');
        }
        if (id === 'theme-auto') {
          setUserTheme('auto');
        }
      },
      menuConfig: {
        menuTitle: '',
        menuItems: [
          {
            type: 'menu',
            menuTitle: '',
            menuOptions: ['displayInline'],
            menuItems: [
              {
                actionKey: 'theme-light',
                actionTitle: t(`common.themes.light`),
                menuState: userTheme === 'light' ? 'on' : undefined,
              },
              {
                actionKey: 'theme-dark',
                actionTitle: t(`common.themes.dark`),
                menuState: userTheme === 'dark' ? 'on' : undefined,
              },
            ],
          },
          {
            actionKey: 'theme-auto',
            actionTitle: t(`common.themes.auto`),
            menuState: userTheme === 'auto' ? 'on' : undefined,
          },
        ],
      },
    },
    {
      id: 5,
      title: t('settings.items.haptics.title'),
      value: t(`common.${isHapticEnabled ? 'enabled' : 'disabled'}`),
      onPress: () => {
        setIsHapticEnabled(!isHapticEnabled);
      },
    },
    // {
    //   id: 6,
    //   title: 'Подписка',
    //   value: 'Не активна',
    //   disabled: true,
    // },
    // {
    //   id: 7,
    //   title: 'Написать отзыв',
    //   description: 'Оставьте отзыв о приложении',
    //   disabled: true,
    // },
    // {
    //   id: 8,
    //   title: 'Поддержать разработчика',
    //   disabled: true,
    // },
  ];
  return (
    <View flex={1} color="background" ph="l">
      <ScrollView>
        {items.map(({ id, title, description, value, disabled, onPress, menuConfig }) => (
          <View key={id} mt="xl">
            <MenuItem
              title={title}
              description={description}
              value={value}
              disabled={disabled}
              onPress={onPress}
              menuConfig={menuConfig}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default observer(SettingsScreen);
