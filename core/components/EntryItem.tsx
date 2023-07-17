import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { MenuView } from '@react-native-menu/menu';
import { format } from 'date-fns';
import { Platform, Pressable } from 'react-native';

import { Text } from './Text';
import { View } from './View';
import { useTheme } from '../providers/ThemeProvider';
import { Entry } from '../types/entry';

type Props = {
  data: Entry;
};

export const EntryItem: React.FC<Props> = ({ data }) => {
  const { colors } = useTheme();
  const { name, category, dueDate } = data;
  const isOverdued = name === 'Задача 1';

  return (
    <MenuView
      shouldOpenOnLongPress
      actions={[
        {
          title: '',
          displayInline: true,
          subactions: [
            {
              id: 'to-tomorrow',
              title: 'Перенести на завтра',
            },
            {
              id: 'to-week',
              title: 'Перенести на неделю',
            },
            {
              id: 'to-later',
              title: 'Перенести на позже',
            },
            {
              id: 'custom',
              image: Platform.select({
                ios: 'calendar',
                android: 'ic_menu_add',
              }),
              title: 'Установить срок',
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
      <View row alignItems="center" mt="l">
        <View flex={1}>
          <Text text={name} type="labelLarge" />
          <View row>
            {!!category && <Text text={category} type="bodySmall" color="secondary" />}
            {!!dueDate && (
              <>
                {!!category && <Text mh="xs" text="|" type="bodySmall" color="secondary" />}
                <FontAwesome
                  name="clock-o"
                  size={15}
                  color={isOverdued ? colors.danger : colors.secondary}
                />
                <Text
                  text={format(dueDate, 'd.MM.yyyy')}
                  type="bodySmall"
                  color={isOverdued ? 'danger' : 'secondary'}
                  ml="xs"
                />
              </>
            )}
          </View>
        </View>
        <Pressable onPress={() => {}}>
          {({ pressed }) => (
            <AntDesign
              name="play"
              size={30}
              color={colors.primary}
              style={{ opacity: pressed ? 0.5 : 1 }}
            />
          )}
        </Pressable>
      </View>
    </MenuView>
  );
};
