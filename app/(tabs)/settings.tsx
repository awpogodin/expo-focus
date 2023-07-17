import { useTranslation } from 'react-i18next';
import { Platform, ScrollView } from 'react-native';

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
      actions: [
        {
          title: '',
          displayInline: true,
          subactions: [
            {
              id: '15',
              title: t('common.minutesShort', { value: 15 }),
            },
            {
              id: '20',
              title: t('common.minutesShort', { value: 20 }),
            },
            {
              id: '25',
              title: t('common.minutesShort', { value: 25 }),
              state: 'on',
            },
            {
              id: '30',
              title: t('common.minutesShort', { value: 30 }),
            },
            {
              id: '45',
              title: t('common.minutesShort', { value: 45 }),
            },
            {
              id: '50',
              title: t('common.minutesShort', { value: 50 }),
            },
            {
              id: '60',
              title: t('common.minutesShort', { value: 60 }),
            },
          ],
        },
        {
          id: 'custom',
          title: 'Настроить',
          image: Platform.select({
            ios: 'lock.fill',
            android: 'ic_menu_add',
          }),
          attributes: {
            disabled: true,
          },
        },
      ],
    },
    {
      id: 2,
      title: 'Продолжительность перерыва',
      description: 'Продолжительность короткого и длинного перерывов',
      value: t('common.minutesShort', { value: '5, 20' }),
      actions: [
        {
          title: 'Короткий перерыв',
          displayInline: true,
          subactions: [
            {
              id: '5',
              title: t('common.minutesShort', { value: 5 }),
              state: 'on',
            },
            {
              id: '10',
              title: t('common.minutesShort', { value: 10 }),
            },
          ],
        },
        {
          id: 'custom',
          title: 'Настроить',
          image: Platform.select({
            ios: 'lock.fill',
            android: 'ic_menu_add',
          }),
          attributes: {
            disabled: true,
          },
        },
        {
          title: 'Длинный перерыв',
          displayInline: true,
          subactions: [
            {
              id: '15',
              title: t('common.minutesShort', { value: 15 }),
            },
            {
              id: '20',
              title: t('common.minutesShort', { value: 20 }),
              state: 'on',
            },
            {
              id: '30',
              title: t('common.minutesShort', { value: 30 }),
            },
          ],
        },
        {
          id: 'custom',
          title: 'Настроить',
          image: Platform.select({
            ios: 'lock.fill',
            android: 'ic_menu_add',
          }),
          attributes: {
            disabled: true,
          },
        },
      ],
    },
    {
      id: 3,
      title: 'Цикл',
      value: '4',
      actions: [
        {
          title: '',
          displayInline: true,
          subactions: [
            {
              id: '1',
              title: '1',
            },
            {
              id: '2',
              title: '2',
            },
            {
              id: '3',
              title: '3',
            },
            {
              id: '4',
              title: '4',
              state: 'on',
            },
          ],
        },
        {
          id: 'custom',
          title: 'Настроить',
          image: Platform.select({
            ios: 'lock.fill',
            android: 'ic_menu_add',
          }),
          attributes: {
            disabled: true,
          },
        },
      ],
      disabled: true,
    },
    {
      id: 4,
      title: 'Тема приложения',
      description: 'Выберите тему приложения',
      value: 'Авто',
      actions: [
        {
          title: '',
          displayInline: true,
          subactions: [
            {
              id: 'light',
              title: 'Светлая',
            },
            {
              id: 'dark',
              title: 'Темная',
            },
          ],
        },
        {
          id: 'auto',
          title: 'Авто',
        },
      ],
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
        {items.map(
          ({
            id,
            title,
            description,
            value,
            disabled,
            onPress,
            actions,
            menuViewTitle,
            onPressAction,
          }) => (
            <View key={id} mt="xl">
              <MenuItem
                title={title}
                description={description}
                value={value}
                disabled={disabled}
                onPress={onPress}
                actions={actions}
                menuViewTitle={menuViewTitle}
                onPressAction={onPressAction}
              />
            </View>
          )
        )}
      </ScrollView>
    </View>
  );
}
