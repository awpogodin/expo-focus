import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';

import { MenuItem } from '../../core/components/MenuItem';
import { View } from '../../core/components/View';

type Item = React.ComponentProps<typeof MenuItem> & {
  id: number;
};

export default function SettingsScreen() {
  const { t } = useTranslation();
  const items: Item[] = [
    {
      id: 1,
      title: 'Продолжительность focus',
      description: 'Продолжительность времени фокусировки',
      value: t('common.minutesShort', { value: 25 }),
      menuConfig: {
        menuTitle: '',
        menuItems: [
          {
            type: 'menu',
            menuTitle: '',
            menuOptions: ['displayInline'],
            menuItems: [
              {
                actionKey: 'focus-duration-15',
                actionTitle: t('common.minutesShort', { value: 15 }),
              },
              {
                actionKey: 'focus-duration-20',
                actionTitle: t('common.minutesShort', { value: 20 }),
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
                scale: 'small',
              },
            },
          },
        ],
      },
    },
    {
      id: 2,
      title: 'Продолжительность перерыва',
      description: 'Продолжительность короткого и длинного перерывов',
      value: t('common.minutesShort', { value: '5, 20' }),
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
              },
              {
                actionKey: 'short-break-duration-10',
                actionTitle: t('common.minutesShort', { value: 10 }),
              },
              {
                actionKey: 'short-break-duration-custom',
                actionTitle: t('common.configure'),
                menuAttributes: ['disabled'],
                icon: {
                  type: 'IMAGE_SYSTEM',
                  imageValue: {
                    systemName: 'lock.fill',
                    scale: 'small',
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
              },
              {
                actionKey: 'long-break-duration-20',
                actionTitle: t('common.minutesShort', { value: 20 }),
              },
              {
                actionKey: 'long-break-duration-30',
                actionTitle: t('common.minutesShort', { value: 30 }),
              },
              {
                actionKey: 'long-break-duration-custom',
                actionTitle: t('common.configure'),
                menuAttributes: ['disabled'],
                icon: {
                  type: 'IMAGE_SYSTEM',
                  imageValue: {
                    systemName: 'lock.fill',
                    scale: 'small',
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
      title: 'Цикл',
      value: '4',
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
              },
              {
                actionKey: 'focus-loops-3',
                actionTitle: '3',
              },
              {
                actionKey: 'focus-loops-4',
                actionTitle: '4',
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
                scale: 'small',
              },
            },
          },
        ],
      },
      disabled: true,
    },
    {
      id: 4,
      title: 'Тема приложения',
      description: 'Выберите тему приложения',
      value: 'Авто',
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
                actionTitle: 'Светлая',
              },
              {
                actionKey: 'theme-dark',
                actionTitle: 'Темная',
              },
            ],
          },
          {
            actionKey: 'theme-auto',
            actionTitle: 'Авто',
          },
        ],
      },
    },
    {
      id: 5,
      title: 'Подписка',
      value: 'Не активна',
      disabled: true,
    },
    {
      id: 6,
      title: 'Написать отзыв',
      description: 'Оставьте отзыв о приложении',
      disabled: true,
    },
    {
      id: 7,
      title: 'Поддержать разработчика',
    },
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
}
