import uuid from 'react-native-uuid';
import { create } from 'zustand';

import { persist } from './persist';
import StorageKey from './StorageKey';

export interface Share {
  id: string;
  memberId: string;

  percentage: number;
}
export interface Expense {
  id: string;
  groupId: string;

  sponsorShares: Share[];

  subExpenseIds: string[];
  categoryIds: string[];

  title: string;
  description: string;

  date: Date;
}
export interface Subexpense {
  id: string;

  shares: Share[];

  title: string;
  price: number;
}

export interface ExpensesStore {
  expenses: Expense[];
  subexpenses: Subexpense[];

  actions: {
    createExpense: (
      groupId: string,
      expense: Omit<Expense, 'id' | 'groupId'>
    ) => Expense;
    deleteExpense: (expenseId: string) => void;
    createSubexpenses: (subexpenses: Omit<Subexpense, 'id'>[]) => Subexpense[];
  };
}

export const useExpensesStore = create<ExpensesStore>(
  persist(StorageKey.EXPENSE, (set) => ({
    expenses: [],
    subexpenses: [],
    actions: {
      createExpense: (groupId, expense) => {
        const newExpense = {
          id: uuid.v4() as string,
          groupId,
          ...expense,
        };
        set((store) => ({
          ...store,
          expenses: [...store.expenses, newExpense],
        }));

        return newExpense;
      },
      deleteExpense: (expenseId) => {
        set((store) => ({
          ...store,
          expenses: store.expenses.filter((i) => i.id !== expenseId),
        }));
      },
      createSubexpenses: (subexpenses) => {
        const newSubexpenses = subexpenses.map<Subexpense>((i) => ({
          id: uuid.v4() as string,
          ...i,
        }));
        set((store) => ({
          subexpenses: [...store.subexpenses, ...newSubexpenses],
        }));
        return newSubexpenses;
      },
    },
  }))
);
