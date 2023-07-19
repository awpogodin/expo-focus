export const resources = {
  ru: {
    translation: {
      entries: {
        screenTitle: 'Задачи',
        noEntries: {
          title: 'У Вас нет задач',
          description: 'Тут будут отображаться Ваши задачи',
        },

        sections: {
          inbox: 'Входящие',
          tomorrow: 'Завтра',
          week: 'На этой неделе',
          later: 'Позже',
        },

        actionsMenu: {
          moveToTomorrow: 'Перенести на завтра',
          moveToWeek: 'Перенести на неделю',
          moveToLater: 'Перенести на позже',
          setDueDate: 'Установить срок',
          edit: 'Редактировать',
          remove: 'Удалить',
          schedule: 'Запланировать',
        },
      },
      home: {
        title: 'Focus',

        actionsMenu: {
          moveToInbox: 'Вернуть во входящие',
          done: 'Выполнено',
          remove: 'Удалить',
        },
      },
      buttons: {
        save: 'Сохранить',
        back: 'Назад',
        cancel: 'Отменить',
        confirm: 'Подвтердить',
      },
      entry: {
        screenTitle: 'Новая задача',
        name: 'Название',
        category: 'Категория',
        dueDate: 'Срок',
        categoryPromptTitle: 'Новая категория',
        categoryPromptSubtitle: 'Введите название категории',

        removingConfirmation: 'Вы действительно хотите удалить задачу?',
        scheduledTaskExist: 'Текущая запланированная задача будет возвращена',

        actionsMenu: {
          addCategory: 'Добавить категорию',
          today: 'Сегодня',
          tomorrow: 'Завтра',
          selectDate: 'Выбрать дату',
          clear: 'Очистить',
        },
      },
      settings: {
        screenTitle: 'Настройки',
        items: {
          focusDuration: {
            title: 'Продолжительность focus',
            description: 'Продолжительность времени фокусировки',
          },

          breaks: {
            title: 'Продолжительность перерыва',
            description: 'Продолжительность короткого и длинного перерывов',
          },
        },
      },
      common: {
        minutesShort: '{{value}} мин',
        configure: 'Настроить',
        shortBreak: 'Короткий перерыв',
        longBreak: 'Длинный перерыв',
        themes: {
          light: 'Светлая',
          dark: 'Темная',
          auto: 'Системная',
        },
      },
    },
  },
  en: {
    translation: {
      entries: {
        screenTitle: 'Tasks',
        noEntries: {
          title: 'No tasks',
          description: 'Tasks will be displayed here',
        },

        sections: {
          inbox: 'Inbox',
          tomorrow: 'Tomorrow',
          week: 'On this week',
          later: 'Later',
        },

        actionsMenu: {
          moveToTomorrow: 'Move to tomorrow',
          moveToWeek: 'Move to week',
          moveToLater: 'Move to later',
          setDueDate: 'Set due date',
          edit: 'Edit',
          remove: 'Remove',
          schedule: 'Schedule',
        },
      },
      home: {
        title: 'Focus',

        actionsMenu: {
          moveToInbox: 'Return to inbox',
          done: 'Done',
          remove: 'Remove',
        },
      },
      buttons: {
        save: 'Save',
        back: 'Back',
        cancel: 'Cancel',
        confirm: 'Confirm',
      },
      entry: {
        screenTitle: 'New task',
        name: 'Name',
        category: 'Category',
        dueDate: 'Due date',
        categoryPromptTitle: 'New category',
        categoryPromptSubtitle: "Enter category's name",

        removingConfirmation: 'Do you really want to delete the task?',
        scheduledTaskExist: 'The current scheduled task will be returned',

        actionsMenu: {
          addCategory: 'Add category',
          today: 'Today',
          tomorrow: 'Tomorrow',
          selectDate: 'Select date',
          clear: 'Clear',
        },
      },
      settings: {
        screenTitle: 'Settings',
        items: {
          focusDuration: {
            title: 'Продолжительность focus',
            description: 'Продолжительность времени фокусировки',
          },

          breaks: {
            title: 'Продолжительность перерыва',
            description: 'Продолжительность короткого и длинного перерывов',
          },
        },
      },
      common: {
        minutesShort: '{{value}} min',
        configure: 'Configure',
        shortBreak: 'Short break',
        longBreak: 'Long break',
        themes: {
          light: 'Light',
          dark: 'Dark',
          auto: 'Auto',
        },
      },
    },
  },
};
