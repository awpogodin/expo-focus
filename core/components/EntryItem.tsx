import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { differenceInDays } from 'date-fns';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { ActionSheetIOS, Pressable } from 'react-native';
import { ContextMenuView } from 'react-native-ios-context-menu';

import { Text } from './Text';
import { View } from './View';
import { formatDate, parseDate } from '../helpers/dates';
import tasksStore, { Task } from '../models/tasksStore';
import { useTheme } from '../providers/ThemeProvider';

type Props = {
  data: Task;
};

export const EntryItem: React.FC<Props> = observer(({ data }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { removeTask, setCurrentTaskId, currentTaskId } = tasksStore;
  const { id, name, category, dueDate } = data;
  const isOverdued =
    dueDate && differenceInDays(parseDate(dueDate), parseDate(formatDate(new Date()))) < 1;

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
              },
            },
          },
        ],
      },
      {
        actionKey: 'edit',
        actionTitle: t('entries.actionsMenu.edit'),
        icon: {
          type: 'IMAGE_SYSTEM',
          imageValue: {
            systemName: 'pencil',
          },
        },
      },
      {
        actionKey: 'remove',
        actionTitle: t('entries.actionsMenu.remove'),
        menuAttributes: ['destructive'],
        icon: {
          type: 'IMAGE_SYSTEM',
          imageValue: {
            systemName: 'trash',
          },
        },
      },
    ],
  };

  const handlePressMenuItem: React.ComponentProps<typeof ContextMenuView>['onPressMenuItem'] = ({
    nativeEvent,
  }) => {
    const actionKey = nativeEvent.actionKey;
    if (actionKey === 'remove') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          title: t('entry.removingConfirmation'),
          options: [t('buttons.cancel'), t('buttons.confirm')],
          destructiveButtonIndex: 1,
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            removeTask(id);
          }
        }
      );
    }
  };

  const handleScheduleTask = () => {
    if (currentTaskId) {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          title: t('entry.scheduledTaskExist'),
          options: [t('buttons.cancel'), t('buttons.confirm')],
          destructiveButtonIndex: 1,
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            setCurrentTaskId(id);
          }
        }
      );
      return;
    }
    setCurrentTaskId(id);
  };

  return (
    <ContextMenuView menuConfig={menuConfig} onPressMenuItem={handlePressMenuItem}>
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
                  text={dueDate}
                  type="bodySmall"
                  color={isOverdued ? 'danger' : 'secondary'}
                  ml="xs"
                />
              </>
            )}
          </View>
        </View>
        <Pressable onPress={handleScheduleTask}>
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
});
