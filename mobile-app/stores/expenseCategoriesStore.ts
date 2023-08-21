import { create } from 'zustand';

import { ExpenseCategoryDto } from '../../backend/src/groups/expense-categories/dto/expense-category.dto';
import { persist } from './persist';
import StorageKey from './StorageKey';

export interface ExpenseCategoriesStore {
  categories: ExpenseCategoryDto[];

  actions: {
    addCategory: (category: ExpenseCategoryDto) => ExpenseCategoryDto;
    addCategories: (categories: ExpenseCategoryDto[]) => ExpenseCategoryDto[];
    setCategories: (categories: ExpenseCategoryDto[]) => ExpenseCategoryDto[];
    removeCategory: (groupId: string, categoryId: string) => void;
  };
}
export const useExpenseCategoriesStore = create<ExpenseCategoriesStore>(
  persist(StorageKey.EXPENSE_CATEGORY, (set) => ({
    categories: [],

    actions: {
      addCategory: (category) => {
        set((store) => ({
          categories: store.categories.concat([category]),
        }));
        return category;
      },
      addCategories: (categories) => {
        set((store) => ({
          categories: store.categories.concat(categories),
        }));
        return categories;
      },
      setCategories: (categories) => {
        set((store) => ({
          categories,
        }));
        return categories;
      },
      removeCategory: (categoryId) => {
        set((store) => ({
          categories: store.categories.filter((i) => i.id !== categoryId),
        }));
      },
    },
  }))
);
