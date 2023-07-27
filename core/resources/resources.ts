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
          moveToInbox: 'Отложить во входящие',
          done: 'Выполнено',
          remove: 'Удалить',
        },

        controlContextMenu: {
          reset: 'Стоп',
          next: 'Пропустить',
        },
      },
      buttons: {
        save: 'Сохранить',
        back: 'Назад',
        cancel: 'Отменить',
        confirm: 'Подтвердить',
        continue: 'Продолжить',
      },
      entry: {
        screenTitle: 'Новая задача',
        screenTitleEditing: 'Задача',
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

          cycle: {
            title: 'Цикл',
            prompt: {
              title: 'Цикл',
              subTitle: 'Введите кол-во Focus в цикле (1-9)',
            },
          },

          theme: {
            title: 'Тема приложения',
            description: 'Выберите тему приложения',
          },

          haptics: {
            title: 'Вибрация',
          },
        },
      },
      onboarding: {
        title: 'Добро пожаловать в Focus App',
        items: {
          tasks: {
            title: 'Задачи',
            description: 'Добавляйте и фокусируйтесь на задачах.',
          },
          focus: {
            title: 'Focus & Health',
            description:
              'Используйте доказанную технику, чтобы лучше сосредоточиться и снизить стресс.',
          },
          design: {
            title: 'Современный дизайн',
            description:
              'Минималистичный, простой в использовании и красивый интерфейс, которым приятно пользоваться.',
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
        timerTitle: {
          focus: 'Focus',
          shortBreak: 'Короткий перерыв',
          longBreak: 'Длинный перерыв',
        },
        enabled: 'Включена',
        disabled: 'Выключена',
      },
      notifications: {
        timeOver: {
          focus: {
            title: 'Focus завершен!',
            body: 'Сделайте перерыв, отложите дела и отдохните',
          },
          shortBreak: {
            title: 'Пора вернуться к задаче!',
            body: 'Сфокусируйтесь на задаче',
          },
          longBreak: {
            title: 'Цикл завершен!',
            body: 'Начните фокусировку, если задача еще не выполнена, либо завершите ее',
          },
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
          moveToInbox: 'Move to inbox',
          done: 'Done',
          remove: 'Remove',
        },

        controlContextMenu: {
          reset: 'Stop',
          next: 'Skip',
        },
      },
      buttons: {
        save: 'Save',
        back: 'Back',
        cancel: 'Cancel',
        confirm: 'Confirm',
        continue: 'Continue',
      },
      entry: {
        screenTitle: 'New task',
        screenTitleEditing: 'Task',
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
            title: 'Focus duration',
            description: 'Duration of focus time',
          },

          breaks: {
            title: 'Duration of the break',
            description: 'Duration of short and long breaks',
          },

          cycle: {
            title: 'Cycle',
            prompt: {
              title: 'Cycle',
              subTitle: 'Enter count of Focus in the cycle (1-9)',
            },
          },

          theme: {
            title: 'App theme',
            description: 'Choose theme of the app',
          },

          haptics: {
            title: 'Vibration',
          },
        },
      },
      onboarding: {
        title: 'Welcome to Focus App',
        items: {
          tasks: {
            title: 'Tasks',
            description: 'Add and focus on tasks.',
          },
          focus: {
            title: 'Focus & Health',
            description: 'Use a proven technique to focus better and reduce stress.',
          },
          design: {
            title: 'Modern design',
            description:
              'Minimalistic, easy to use and beautiful interface, which is a pleasure to use.',
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
        timerTitle: {
          focus: 'Focus',
          shortBreak: 'Short break',
          longBreak: 'Long break',
        },
        enabled: 'Enabled',
        disabled: 'Disabled',
      },
      notifications: {
        timeOver: {
          focus: {
            title: 'Focus is completed!',
            body: 'Take a break, put things aside and relax',
          },
          shortBreak: {
            title: "It's time to get back to the focus!",
            body: 'Focus on the task at hand',
          },
          longBreak: {
            title: 'The cycle is completed!',
            body: 'Start focusing if the task has not been completed yet, or finish it',
          },
        },
      },
    },
  },
};
