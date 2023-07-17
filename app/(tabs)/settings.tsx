import { Platform, ScrollView } from 'react-native';

import { MenuItem } from '../../core/components/MenuItem';
import { View } from '../../core/components/View';

type Item = React.ComponentProps<typeof MenuItem> & {
  id: number;
};

export default function SettingsScreen() {
  const items: Item[] = [
    {
      id: 1,
      title: 'Продолжительность focus',
      description: 'Продолжительность времени фокусировки',
      value: '25 мин',
      actions: [
        {
          title: '',
          displayInline: true,
          subactions: [
            {
              id: '20',
              title: '20 мин',
            },
            {
              id: '25',
              title: '25 мин',
            },
            {
              id: '30',
              title: '30 мин',
            },
            {
              id: '45',
              title: '45 мин',
            },
          ],
        },
        {
          id: 'custom',
          title: 'Настраиваемое',
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
      title: 'Продолжительность перерывов',
      description: 'Продолжительность короткого и длинного перерывов',
      value: '5, 30 мин',
      actions: [
        {
          title: 'Короткие перерывы',
          displayInline: true,
          subactions: [
            {
              id: '5',
              title: '5 мин',
            },
            {
              id: '10',
              title: '10 мин',
            },
            {
              id: '15',
              title: '15 мин',
            },
          ],
        },
        {
          id: 'custom',
          title: 'Настраиваемое',
          image: Platform.select({
            ios: 'lock.fill',
            android: 'ic_menu_add',
          }),
          attributes: {
            disabled: true,
          },
        },
        {
          title: 'Длинные перерывы',
          displayInline: true,
          subactions: [
            {
              id: '25',
              title: '25 мин',
            },
            {
              id: '30',
              title: '30 мин',
            },
            {
              id: '35',
              title: '35 мин',
            },
          ],
        },
        {
          id: 'custom',
          title: 'Настраиваемое',
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
      title: 'Подписка',
      value: 'Не активна',
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
      title: 'Написать отзыв',
      description: 'Оставьте отзыв о приложении',
      disabled: true,
    },
    {
      id: 6,
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
