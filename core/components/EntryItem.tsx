import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';
import { ContextMenuView } from 'react-native-ios-context-menu';

import { Text } from './Text';
import { View } from './View';
import { useTheme } from '../providers/ThemeProvider';
import { Entry } from '../types/entry';

type Props = {
  data: Entry;
};

export const EntryItem: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { name, category, dueDate } = data;
  const isOverdued = name === 'Задача 1';

  const menuConfig: React.ComponentProps<typeof ContextMenuView>['menuConfig'] = {
    menuTitle: '',
    menuItems: [
      {
        type: 'menu',
        menuTitle: '',
        menuOptions: ['displayInline'],
        menuItems: [
          {
            actionKey: 'move-to-tomorrow',
            actionTitle: t('entries.actionsMenu.moveToTomorrow'),
          },
          {
            actionKey: 'move-to-week',
            actionTitle: t('entries.actionsMenu.moveToWeek'),
          },
          {
            actionKey: 'move-to-later',
            actionTitle: t('entries.actionsMenu.moveToLater'),
          },
          {
            actionKey: 'set-due-date',
            actionTitle: t('entries.actionsMenu.setDueDate'),
            icon: {
              type: 'IMAGE_SYSTEM',
              imageValue: {
                systemName: 'calendar',
                scale: 'small',
              },
            },
          },
        ],
      },
      {
        actionKey: 'remove',
        actionTitle: t('entries.actionsMenu.remove'),
        menuAttributes: ['destructive'],
        icon: {
          type: 'IMAGE_SYSTEM',
          imageValue: {
            systemName: 'trash',
            scale: 'small',
          },
        },
      },
    ],
  };

  return (
    <ContextMenuView menuConfig={menuConfig}>
      <View row alignItems="center" mh="l" mt="l">
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
    </ContextMenuView>
  );
};
