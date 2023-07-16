import { useTranslation } from 'react-i18next';
import { SectionList, SectionListData, StyleSheet } from 'react-native';

import { EntryItem } from '../../core/components/EntryItem';
import { Text } from '../../core/components/Text';
import { View } from '../../core/components/View';
import { Entry } from '../../core/types/entry';

const makeEntry = (id: number, name: string, category?: string, dueDate?: number): Entry => ({
  id,
  name,
  category,
  dueDate,
});

const data = [
  {
    title: 'Входящие',
    isInbox: true,
    total: 2,
    data: [makeEntry(1, 'Задача 1', 'Работа', Date.now()), makeEntry(2, 'Задача 2', 'Работа')],
  },
  {
    title: 'Завтра',
    total: 9,
    data: [
      makeEntry(3, 'Задача 3', 'Работа', Date.now()),
      makeEntry(4, 'Задача 4', 'Личное', Date.now()),
      makeEntry(5, 'Задача 5'),
      makeEntry(6, 'Задача 6'),
    ],
  },
];

type Section = {
  title: string;
  total: number;
  isInbox?: boolean;
  data: Entry[];
};

export default function EntriesScreen() {
  const { t } = useTranslation();

  const renderSectionHeader = ({
    section: { title, isInbox, total },
  }: {
    section: SectionListData<Entry, Section>;
  }) => (
    <View row justifyContent="space-between" pt="xl" color="background">
      <Text text={title} type="bodyMedium" color={isInbox ? 'primary' : 'secondary'} />
      <Text text={total.toString()} type="bodyMedium" color={isInbox ? 'primary' : 'secondary'} />
    </View>
  );
  return (
    <View flex={1} color="background" ph="l">
      <View flex={1}>
        {data.length ? (
          <SectionList<Entry, Section>
            sections={data}
            keyExtractor={({ id }) => id.toString()}
            renderItem={({ item }) => <EntryItem data={item} />}
            renderSectionHeader={renderSectionHeader}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.noEntriesContainer}>
            <Text type="titleMedium" align="center" mb="xs" text={t('entries.noEntries.title')} />
            <Text
              type="bodyMedium"
              color="secondary"
              align="center"
              text={t('entries.noEntries.description')}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  noEntriesContainer: {
    marginTop: 150,
  },
});
