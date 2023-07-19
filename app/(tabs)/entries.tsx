import { addDays, differenceInDays, isBefore, lastDayOfWeek } from 'date-fns';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SectionList, SectionListData } from 'react-native';

import { EntryItem } from '../../core/components/EntryItem';
import { Text } from '../../core/components/Text';
import { View } from '../../core/components/View';
import { formatDate, parseDate } from '../../core/helpers/dates';
import tasksStore, { Task } from '../../core/models/tasksStore';

type Section = {
  title: string;
  total: number;
  isInbox?: boolean;
  data: Task[];
};
const EntriesScreen = () => {
  const { t } = useTranslation();
  const { sortedTasks, currentTaskId } = tasksStore;

  console.log('tasks = ', sortedTasks);

  const sections = useMemo(() => {
    const result = [];
    const inboxTasks: Task[] = [];
    const tomorrowTasks: Task[] = [];
    const weekTasks: Task[] = [];
    const laterTasks: Task[] = [];

    sortedTasks.forEach((task) => {
      if (task.id === currentTaskId || task.isDone || task.isDeleted) {
        return;
      }
      if (!task.dueDate) {
        inboxTasks.push(task);
        return;
      }
      const diff = differenceInDays(parseDate(task.dueDate), parseDate(formatDate(new Date())));
      if (diff < 1) {
        inboxTasks.push(task);
        return;
      }
      if (!!task.dueDate && diff === 1) {
        tomorrowTasks.push(task);
        return;
      }
      // FIXME: починить работу с датами
      if (
        diff > 1 &&
        isBefore(
          parseDate(task.dueDate),
          addDays(lastDayOfWeek(parseDate(formatDate(new Date())), { weekStartsOn: 1 }), 1)
        )
      ) {
        weekTasks.push(task);
        return;
      }
      laterTasks.push(task);
    });

    if (inboxTasks.length) {
      result.push({
        title: t('entries.sections.inbox'),
        total: inboxTasks.length,
        isInbox: true,
        data: inboxTasks,
      });
    }

    if (tomorrowTasks.length) {
      result.push({
        title: t('entries.sections.tomorrow'),
        total: tomorrowTasks.length,
        data: tomorrowTasks,
      });
    }

    if (weekTasks.length) {
      result.push({
        title: t('entries.sections.week'),
        total: weekTasks.length,
        data: weekTasks,
      });
    }

    if (laterTasks.length) {
      result.push({
        title: t('entries.sections.later'),
        total: laterTasks.length,
        data: laterTasks,
      });
    }
    return result;
  }, [sortedTasks, currentTaskId]);

  const renderSectionHeader = ({
    section: { title, isInbox, total },
  }: {
    section: SectionListData<Task, Section>;
  }) => (
    <View row justifyContent="space-between" mh="l" pt="xl" color="background">
      <Text text={title} type="bodyMedium" color={isInbox ? 'primary' : 'secondary'} />
      <Text text={total.toString()} type="bodyMedium" color={isInbox ? 'primary' : 'secondary'} />
    </View>
  );
  return (
    <View flex={1} color="background">
      <View flex={1}>
        {sections.length ? (
          <SectionList<Task, Section>
            sections={sections}
            keyExtractor={({ id }) => id.toString()}
            renderItem={({ item }) => <EntryItem data={item} />}
            renderSectionHeader={renderSectionHeader}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View flex={1} justifyContent="center">
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
};

export default observer(EntriesScreen);
