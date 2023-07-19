import { isBefore } from 'date-fns';
import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { nanoid } from 'nanoid';

import { parseDate } from '../helpers/dates';

export type Task = {
  id: string;
  name: string;
  category?: string;
  dueDate?: string;
  createdAt: number;
  updatedAt?: number;
  isDeleted?: boolean;
  isDone?: boolean;
};

class TasksStore {
  tasks: Task[] = [];
  categories: string[] = ['Работа'];

  currentTaskId: string | null = null;

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: 'TasksStore',
      properties: ['tasks', 'categories', 'currentTaskId'],
    });
  }

  get sortedTasks() {
    return this.tasks
      .slice()
      .sort((a, b) => {
        return isBefore(a.createdAt, b.createdAt) ? 1 : -1;
      })
      .sort((a, b) => {
        if (a.dueDate && b.dueDate) {
          return isBefore(parseDate(a.dueDate), parseDate(b.dueDate)) ? -1 : 1;
        }
        return 1;
      });
  }

  getTasksAll = () => this.tasks;

  getCategoriesAll = () => this.categories;

  addTask = (data: Omit<Task, 'id' | 'createdAt'>) => {
    this.tasks = [...this.tasks, { id: nanoid(), createdAt: new Date().getTime(), ...data }];
  };

  getTaskById = (id: string) => {
    return this.tasks.find((task) => task.id === id);
  };

  /**
   * Обновление задачи
   */
  updateTask = (id: string, data: Partial<Omit<Task, 'id'>>) => {
    this.tasks = this.tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          ...data,
          isDone: false,
          isDeleted: false,
          updatedAt: new Date().getTime(),
        };
      }
      return task;
    });
  };

  /**
   * Удаление задачи
   */
  removeTask = (id: string) => {
    // this.tasks = this.tasks.filter((task) => task.id !== id);
    this.tasks = this.tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isDeleted: true };
      }
      return task;
    });
  };

  /**
   * Отмечает задачу как "выполнено"
   */
  doneTask = (id: string) => {
    // this.tasks = this.tasks.filter((task) => task.id !== id);
    this.tasks = this.tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isDone: true };
      }
      return task;
    });
  };

  setCurrentTaskId = (id?: string) => {
    this.currentTaskId = id ?? null;
  };
}

const tasksStore = new TasksStore();

export default tasksStore;
