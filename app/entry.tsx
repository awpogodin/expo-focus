import { format } from 'date-fns';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, StyleSheet, TextInput } from 'react-native';

import { Text } from '../core/components/Text';
import { View } from '../core/components/View';
import { useTheme } from '../core/providers/ThemeProvider';

const categories = [
  { id: 1, name: 'Работа' },
  { id: 2, name: 'Личное' },
];

export default function EntryModal() {
  const { t } = useTranslation();
  const { typography, colors } = useTheme();
  const [name, setName] = useState<string | undefined>();
  const [categoryId, setCategoryId] = useState<number | undefined>();
  const [dueDate, setDueDate] = useState<number | undefined>();

  const handleChangeName = (v: string) => {
    setName(v);
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
            style={StyleSheet.flatten([styles.nameInput, { ...typography['bodyLarge'] }])}
          />
          <View mt="l">
            {category ? (
              <Text text={category.name} type="bodyLarge" />
            ) : (
              <Text text={t('entry.category')} color="secondary" type="bodyLarge" />
            )}
          </View>
          <View mt="l">
            {dueDate ? (
              <Text text={format(dueDate, 'd.MM.yyyy')} type="bodyLarge" />
            ) : (
              <Text text={t('entry.dueDate')} color="secondary" type="bodyLarge" />
            )}
          </View>
        </View>
      </View>
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
