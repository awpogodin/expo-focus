import { MenuView, NativeActionEvent } from '@react-native-menu/menu';
import { addDays, format } from 'date-fns';
import { useNavigation, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { upperFirst } from 'lodash';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Platform, Pressable, StyleSheet, TextInput } from 'react-native';
import DatePicker from 'react-native-date-picker';

import { Text } from '../core/components/Text';
import { View } from '../core/components/View';
import { useTheme } from '../core/providers/ThemeProvider';

const categories = [
  { id: '1', name: 'Работа' },
  { id: '2', name: 'Личное' },
];

const NEW_ITEM_MENU_ACTION_ID = 'new-category';

export default function EntryModal() {
  const { t } = useTranslation();
  const { typography, colors } = useTheme();
  const router = useRouter();
  const navigation = useNavigation();

  const [name, setName] = useState<string | undefined>();
  const [categoryId, setCategoryId] = useState<string | undefined>();
  const [dueDate, setDueDate] = useState<Date | undefined>();
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    router.push('../');
  };

  const isSubmitDisabled = true;

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
  }, []);

  const handleChangeName = (v: string) => {
    setName(v);
  };

  const handleCategoryMenuAction = ({ nativeEvent }: NativeActionEvent) => {
    const selectedActionId = nativeEvent.event;
    if (selectedActionId === NEW_ITEM_MENU_ACTION_ID) {
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
    setCategoryId(selectedActionId);
  };

  const handleDateMenuAction = ({ nativeEvent }: NativeActionEvent) => {
    const selectedActionId = nativeEvent.event;
    if (selectedActionId === 'today') {
      setDueDate(new Date());
      return;
    }
    if (selectedActionId === 'tomorrow') {
      setDueDate(addDays(new Date(), 1));
      return;
    }
    if (selectedActionId === 'custom') {
      setOpen(true);
      return;
    }
    if (selectedActionId === 'clear') {
      setDueDate(undefined);
    }
  };

  const category = categories.find(({ id }) => id === categoryId);

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
          <MenuView
            onPressAction={handleCategoryMenuAction}
            actions={[
              {
                id: NEW_ITEM_MENU_ACTION_ID,
                title: t('entry.actionsMenu.addCategory'),
                image: Platform.select({
                  ios: 'plus',
                  android: 'ic_menu_add',
                }),
              },
              {
                title: '',
                displayInline: true,
                subactions: [
                  ...categories.map(({ id, name }) => ({
                    id: id.toString(),
                    title: name,
                  })),
                ],
              },
            ]}>
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
          </MenuView>
          <MenuView
            onPressAction={handleDateMenuAction}
            actions={[
              {
                title: '',
                displayInline: true,
                subactions: [
                  {
                    id: 'today',
                    title: t('entry.actionsMenu.today'),
                  },
                  {
                    id: 'tomorrow',
                    title: t('entry.actionsMenu.tomorrow'),
                  },
                  {
                    id: 'custom',
                    image: Platform.select({
                      ios: 'calendar',
                      android: 'ic_menu_add',
                    }),
                    title: t('entry.actionsMenu.selectDate'),
                  },
                ],
              },
              {
                id: 'clear',
                title: t('entry.actionsMenu.clear'),
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
            <Pressable>
              {({ pressed }) => (
                <View mt="l" style={{ opacity: pressed ? 0.5 : 1 }}>
                  {dueDate ? (
                    <Text text={format(dueDate, 'd.MM.yyyy')} type="bodyLarge" />
                  ) : (
                    <Text text={t('entry.dueDate')} color="secondary" type="bodyLarge" />
                  )}
                </View>
              )}
            </Pressable>
          </MenuView>
        </View>
      </View>
      <DatePicker
        modal
        open={open}
        date={dueDate ?? new Date()}
        mode="date"
        onConfirm={(date) => {
          setOpen(false);
          setDueDate(date);
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
