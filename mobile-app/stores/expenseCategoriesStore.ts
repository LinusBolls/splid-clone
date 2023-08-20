import uuid from 'react-native-uuid';
import { create } from 'zustand';

import { persist } from './persist';
import StorageKey from './StorageKey';

export interface ExpenseCategory {
  id: string;
  groupId: string;

  displayName: string;
}
export interface ExpenseCategoriesStore {
  categories: ExpenseCategory[];

  actions: {
    createCategory: (
      groupId: string,
      category: Omit<ExpenseCategory, 'id' | 'groupId'>
    ) => ExpenseCategory;
    deleteCategory: (groupId: string, categoryId: string) => void;
  };
}
export const useExpenseCategoriesStore = create<ExpenseCategoriesStore>(
  persist(StorageKey.EXPENSE_CATEGORY, (set) => ({
    categories: [
      {
        id: 'expense-category:default:restaurant',
        displayName: 'Restaurant',
        groupId: '',
      },
    ],

    actions: {
      createCategory: (groupId, category) => {
        const newCategory = {
          id: uuid.v4() as string,
          displayName: category.displayName,
          groupId,
        };
        set((store) => ({
          ...store,
          categories: [...store.categories, newCategory],
        }));

        return newCategory;
      },
      deleteCategory: (categoryId) => {
        set((store) => ({
          ...store,
          categories: store.categories.filter((i) => i.id !== categoryId),
        }));
      },
    },
  }))
);
