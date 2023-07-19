import { addDays } from 'date-fns';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { upperFirst } from 'lodash';
import { observer } from 'mobx-react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Platform, Pressable, StyleSheet, TextInput } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { ContextMenuButton } from 'react-native-ios-context-menu';

import { Text } from '../core/components/Text';
import { View } from '../core/components/View';
import { formatDate } from '../core/helpers/dates';
import tasksStore, { Task } from '../core/models/tasksStore';
import { useTheme } from '../core/providers/ThemeProvider';

const EntryModal = () => {
  const { addTask, updateTask, categories, addCategory, getCategoryById, getTaskById } = tasksStore;

  const { t } = useTranslation();
  const { typography, colors } = useTheme();
  const router = useRouter();
  const navigation = useNavigation();
  const params = useLocalSearchParams();

  console.log('params = ', params);

  useEffect(() => {
    if (params?.id) {
      const currentTask = getTaskById(params.id as string);
      if (!currentTask) {
        return;
      }
      setEditingTask(currentTask);
      setName(currentTask?.name);
      setCategoryId(currentTask?.categoryId);
      setDueDate(currentTask?.dueDate);
    }
  }, [params]);

  const [name, setName] = useState<string | undefined>();
  const [categoryId, setCategoryId] = useState<string | undefined>();
  const [dueDate, setDueDate] = useState<string | undefined>();
  const [open, setOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const category = useMemo(
    () => (categoryId ? getCategoryById(categoryId) : null),
    [categoryId, getCategoryById]
  );

  console.log('name = ', name);
  console.log('category = ', category);
  console.log('dueDate = ', dueDate);

  const handleSubmit = () => {
    if (!name) {
      return;
    }
    if (editingTask) {
      updateTask(editingTask.id, { name, categoryId, dueDate });
    } else {
      addTask({ name, categoryId, dueDate });
    }
    router.push('../');
  };

  const isSubmitDisabled = !name;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={handleSubmit} disabled={isSubmitDisabled}>
          {({ pressed }) => (
            <Text
              type="bodyMedium"
              text={t('buttons.save')}
              style={{ opacity: pressed || isSubmitDisabled ? 0.5 : 1 }}
            />
          )}
        </Pressable>
      ),
    });
  }, [isSubmitDisabled, handleSubmit]);

  const handleChangeName = (v: string) => {
    setName(v);
  };

  const handleCategoryMenuAction: React.ComponentProps<
    typeof ContextMenuButton
  >['onPressMenuItem'] = ({ nativeEvent }) => {
    const selectedActionId = nativeEvent.actionKey;
    if (selectedActionId === 'new-category') {
      Alert.prompt(
        t('entry.categoryPromptTitle'),
        t('entry.categoryPromptSubtitle'),
        (v) => {
          const categoryName = upperFirst(v.substring(0, 12));
          const createdCategory = addCategory(categoryName);
          console.log('createdCategory = ', createdCategory);
          setCategoryId(createdCategory.id);
        },
        'plain-text'
      );
      return;
    }
    if (selectedActionId === 'category-clear') {
      setCategoryId(undefined);
      return;
    }
    setCategoryId(selectedActionId);
  };

  const handleDateMenuAction: React.ComponentProps<typeof ContextMenuButton>['onPressMenuItem'] = ({
    nativeEvent,
  }) => {
    const selectedActionId = nativeEvent.actionKey;
    if (selectedActionId === 'date-today') {
      setDueDate(formatDate(new Date()));
    }
    if (selectedActionId === 'date-tomorrow') {
      setDueDate(formatDate(addDays(new Date(), 1)));
    }
    if (selectedActionId === 'date-custom') {
      setOpen(true);
    }
    if (selectedActionId === 'date-clear') {
      setDueDate(undefined);
    }
  };

  const categoryMenuConfig: React.ComponentProps<typeof ContextMenuButton>['menuConfig'] = {
    menuTitle: '',
    menuItems: [
      {
        actionKey: 'new-category',
        actionTitle: t('entry.actionsMenu.addCategory'),
        icon: {
          type: 'IMAGE_SYSTEM',
          imageValue: {
            systemName: 'plus',
          },
        },
      },
      {
        actionKey: 'category-clear',
        actionTitle: t('entry.actionsMenu.clear'),
        menuAttributes: ['destructive'],
        icon: {
          type: 'IMAGE_SYSTEM',
          imageValue: {
            systemName: 'clear',
          },
        },
      },
      {
        type: 'menu',
        menuTitle: '',
        menuOptions: ['displayInline'],
        menuItems: [
          ...categories.map((c) => ({
            actionKey: c.id,
            actionTitle: c.name,
          })),
        ],
      },
    ],
  };

  const dateMenuConfig: React.ComponentProps<typeof ContextMenuButton>['menuConfig'] = {
    menuTitle: '',
    menuItems: [
      {
        type: 'menu',
        menuTitle: '',
        menuOptions: ['displayInline'],
        menuItems: [
          {
            actionKey: 'date-today',
            actionTitle: t('entry.actionsMenu.today'),
          },
          {
            actionKey: 'date-tomorrow',
            actionTitle: t('entry.actionsMenu.tomorrow'),
          },
          {
            actionKey: 'date-custom',
            actionTitle: t('entry.actionsMenu.selectDate'),
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
        actionKey: 'date-clear',
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
  };

  return (
    <>
      <View flex={1} ph="l" color="background" justifyContent="space-between">
        <View mt="xl">
          <TextInput
            value={name}
            onChangeText={handleChangeName}
            placeholder={t('entry.name')}
            placeholderTextColor={colors.secondary}
            style={StyleSheet.flatten([{ ...typography['bodyLarge'], color: colors.primary }])}
            autoFocus
            onSubmitEditing={handleSubmit}
          />
          <ContextMenuButton
            isMenuPrimaryAction
            menuConfig={categoryMenuConfig}
            onPressMenuItem={handleCategoryMenuAction}>
            <Pressable>
              {({ pressed }) => (
                <View mt="l" style={{ opacity: pressed ? 0.5 : 1 }}>
                  {category ? (
                    <Text text={category.name} type="bodyLarge" />
                  ) : (
                    <Text text={t('entry.category')} color="secondary" type="bodyLarge" />
                  )}
                </View>
              )}
            </Pressable>
          </ContextMenuButton>
          <ContextMenuButton
            isMenuPrimaryAction
            menuConfig={dateMenuConfig}
            onPressMenuItem={handleDateMenuAction}>
            <Pressable>
              {({ pressed }) => (
                <View mt="l" style={{ opacity: pressed ? 0.5 : 1 }}>
                  {dueDate ? (
                    <Text text={dueDate} type="bodyLarge" />
                  ) : (
                    <Text text={t('entry.dueDate')} color="secondary" type="bodyLarge" />
                  )}
                </View>
              )}
            </Pressable>
          </ContextMenuButton>
        </View>
      </View>
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
          setDueDate(formatDate(date));
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </>
  );
};

export default observer(EntryModal);
