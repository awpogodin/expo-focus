import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { addDays, differenceInDays } from 'date-fns';
import { useRouter } from 'expo-router';
import { observer } from 'mobx-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActionSheetIOS, Pressable } from 'react-native';
import DatePicker from 'react-native-date-picker';
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
  const router = useRouter();
  const { colors } = useTheme();
  const { removeTask, setCurrentTaskId, doneTask, currentTaskId, getCategoryById, updateTask } =
    tasksStore;
  const { id, name, categoryId, dueDate } = data;

  const [open, setOpen] = useState(false);

  const category = useMemo(
    () => (categoryId ? getCategoryById(categoryId) : null),
    [categoryId, getCategoryById]
  );

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
            actionKey: 'schedule-task',
            actionTitle: t('entries.actionsMenu.schedule'),
            icon: {
              type: 'IMAGE_SYSTEM',
              imageValue: {
                systemName: 'play.fill',
              },
            },
          },
          {
            actionKey: 'set-done',
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
            menuTitle: t('entries.actionsMenu.setDueDate'),
            menuItems: [
              {
                actionKey: 'set-dueDate',
                actionTitle: t('entry.actionsMenu.selectDate'),
                icon: {
                  type: 'IMAGE_SYSTEM',
                  imageValue: {
                    systemName: 'calendar',
                  },
                },
              },
              {
                actionKey: 'remove-dueDate',
                actionTitle: t('entry.actionsMenu.clear'),
                menuAttributes: ['destructive'],
                icon: {
                  type: 'IMAGE_SYSTEM',
                  imageValue: {
                    systemName: 'clear',
                  },
                },
              },
            ],
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
    if (actionKey === 'edit') {
      router.push({ pathname: '/entry', params: { id } });
    }

    if (actionKey === 'move-to-tomorrow') {
      updateTask(id, { dueDate: formatDate(addDays(new Date(), 1)) });
    }
    if (actionKey === 'move-to-week') {
      updateTask(id, { dueDate: formatDate(addDays(new Date(), 7)) });
    }
    if (actionKey === 'move-to-later') {
      updateTask(id, { dueDate: formatDate(addDays(new Date(), 14)) });
    }
    if (actionKey === 'set-dueDate') {
      setOpen(true);
    }
    if (actionKey === 'remove-dueDate') {
      updateTask(id, { dueDate: undefined });
    }

    if (actionKey === 'schedule-task') {
      handleScheduleTask();
    }

    if (actionKey === 'set-done') {
      doneTask(id);
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
    <>
      <ContextMenuView menuConfig={menuConfig} onPressMenuItem={handlePressMenuItem}>
        <View row alignItems="center" ph="l" pv="s">
          <View flex={1}>
            <Text text={name} type="labelLarge" />
            <View row>
              {!!category && <Text text={category.name} type="bodySmall" color="secondary" />}
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
      <DatePicker
        modal
        title={null}
        confirmText={t('buttons.confirm')}
        cancelText={t('buttons.cancel')}
        open={open}
        date={new Date()}
        mode="date"
        onConfirm={(date) => {
          setOpen(false);
          updateTask(id, { dueDate: formatDate(date) });
          formatDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
});
