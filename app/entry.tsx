import { addDays } from 'date-fns';
import { useNavigation, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { upperFirst } from 'lodash';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Platform, Pressable, StyleSheet, TextInput } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { ContextMenuButton } from 'react-native-ios-context-menu';

import { Text } from '../core/components/Text';
import { View } from '../core/components/View';
import { formatDate } from '../core/helpers/dates';
import tasksStore from '../core/models/tasksStore';
import { useTheme } from '../core/providers/ThemeProvider';

export default function EntryModal() {
  const { addTask, categories } = tasksStore;

  const { t } = useTranslation();
  const { typography, colors } = useTheme();
  const router = useRouter();
  const navigation = useNavigation();

  const [name, setName] = useState<string | undefined>();
  const [category, setCategory] = useState<string | undefined>();
  const [dueDate, setDueDate] = useState<string | undefined>();
  const [open, setOpen] = useState(false);

  console.log('name = ', name);
  console.log('dueDate = ', dueDate);

  const handleSubmit = () => {
    if (!name) {
      return;
    }
    addTask({ name, category, dueDate });
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
          console.log('new category = ', categoryName);
        },
        'plain-text'
      );
      return;
    }
    setCategory(selectedActionId);
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
        type: 'menu',
        menuTitle: '',
        menuOptions: ['displayInline'],
        menuItems: [
          ...categories.map((categoryName) => ({
            actionKey: categoryName,
            actionTitle: categoryName,
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
            systemName: 'trash',
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
            style={StyleSheet.flatten([
              styles.nameInput,
              { ...typography['bodyLarge'], color: colors.primary },
            ])}
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
                    <Text text={category} type="bodyLarge" />
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
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 50,
  },
  nameInput: {
    // height: 40,
    // paddingVertical: 10,
  },
});
