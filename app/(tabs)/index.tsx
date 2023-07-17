import { AntDesign } from '@expo/vector-icons';
import { MenuView, NativeActionEvent } from '@react-native-menu/menu';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, Pressable } from 'react-native';

import { Text } from '../../core/components/Text';
import { View } from '../../core/components/View';
import { useTheme } from '../../core/providers/ThemeProvider';

export default function HomeScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [taskHeight, setTaskHeight] = useState(0);

  const handleTaskMenuAction = ({ nativeEvent }: NativeActionEvent) => {
    const selectedActionId = nativeEvent.event;
    console.log('selectedId = ', selectedActionId);
  };

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
                id: 'today',
                title: 'Вернуть во входящие',
                image: Platform.select({
                  ios: 'tray.and.arrow.down.fill',
                  android: 'ic_menu_add',
                }),
              },
              {
                id: 'done',
                title: 'Выполнено',
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
            title: 'Удалить',
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
        <View
          onLayout={(event) => {
            setTaskHeight(event.nativeEvent.layout.height);
          }}>
          <Text align="center" type="labelLarge" text="Задача 1" mt="xl" />
          <Text align="center" type="bodySmall" color="secondary" mt="xs" text="Работа" />
        </View>
      </MenuView>
      <View flex={1} justifyContent="center">
        <Text align="center" type="bodyLarge" color="secondary" text={t('home.title')} />
        <Text align="center" type="headlineExtraLarge" mt="l" text="25:00" />

        <View mt="xxl" justifyContent="center" row>
          <Pressable onPress={() => {}}>
            {({ pressed }) => (
              <AntDesign
                name="play"
                size={60}
                color={colors.primary}
                style={{ opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
}
