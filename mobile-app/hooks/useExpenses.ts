import { produce } from 'immer';
import uuid from 'react-native-uuid';
import { create } from 'zustand';

export interface Expense {
  id: string;

  title: string;
  description: string;

  price: number;
  date: Date;

  sponsorIds: string[];
  gainerIds: string[];
  subExpenseIds: string[];
  categoryIds: string[];
}
export interface SubExpense {
  id: string;

  title: string;

  sponsorIds: string[];
  gainerIds: string[];

  price: number;
}
export interface ExpenseCategory {
  id: string;

  title: string;
}
export interface GroupMember {
  id: string;

  displayName: string;

  avatarUrl: string | null;
}

export interface ExpensesStore {
  addEmptySubexpense: (expenseId: string) => void;
  removeSubexpense: (parentId: string, childId: string) => void;
  getActiveExpense: () => Expense | null;
  setExpenseTitle: (expenseId: string, value: string) => void;
  setExpensePrice: (expenseId: string, value: number) => void;
  setExpenseDate: (expenseId: string, value: Date) => void;
  addCategoryToExpense: (expenseId: string, categoryId: string) => void;
  removeCategoryFromExpense: (expenseId: string, categoryId: string) => void;
  splitExpenseIntoMultiple: (expenseId: string) => void;
  setSubexpenseTitle: (subexpenseId: string, value: string) => void;
  setSubexpensePrice: (subexpenseId: string, value: number) => void;
  addGainerToSubexpense: (subexpenseId: string, groupMemberId: string) => void;
  removeGainerFromSubexpense: (
    subexpenseId: string,
    groupMemberId: string
  ) => void;

  activeExpenseId: string | null;

  expenses: Expense[];
  subExpenses: SubExpense[];
  expenseCategories: ExpenseCategory[];
  groupMembers: GroupMember[];
}

const useExpenses = create<ExpensesStore>((set, get) => ({
  activeExpenseId: 'expense:first',
  expenses: [
    {
      id: 'expense:first',

      title: '',
      description: '',

      date: new Date(),
      price: 0,

      sponsorIds: [],
      gainerIds: [],
      subExpenseIds: [],
      categoryIds: ['category:default:other'],
    },
  ],
  subExpenses: [],
  expenseCategories: [
    {
      id: 'category:default:restaurant',
      title: 'Restaurant',
    },
    {
      id: 'category:default:groceries',
      title: 'Groceries',
    },
    {
      id: 'category:default:accommodation',
      title: 'Accommodation',
    },
    {
      id: 'category:default:transport',
      title: 'Transport',
    },
    {
      id: 'category:default:other',
      title: 'Other',
    },
  ],
  groupMembers: [
    {
      id: uuid.v4() as string,
      displayName: 'Das Institut',
      avatarUrl: null,
    },
    {
      id: uuid.v4() as string,
      displayName: 'Elina Staerkenberg',
      avatarUrl: null,
    },
    {
      id: uuid.v4() as string,
      displayName: 'Jan-Luca Skrzipczyk',
      avatarUrl: null,
    },
    {
      id: uuid.v4() as string,
      displayName: 'Jannis Kirr',
      avatarUrl: null,
    },
    {
      id: uuid.v4() as string,
      displayName: 'Jonas Wallmann',
      avatarUrl: null,
    },
    {
      id: uuid.v4() as string,
      displayName: 'Josephine Warsel',
      avatarUrl: null,
    },
    {
      id: uuid.v4() as string,
      displayName: 'Laurin Notemann',
      avatarUrl: null,
    },
    {
      id: uuid.v4() as string,
      displayName: 'Leonard Darsow',
      avatarUrl: null,
    },
    {
      id: uuid.v4() as string,
      displayName: 'Linus Bolls',
      avatarUrl: null,
    },
    {
      id: uuid.v4() as string,
      displayName: 'Linus Schicke',
      avatarUrl: null,
    },
    {
      id: uuid.v4() as string,
      displayName: 'Moritz',
      avatarUrl: null,
    },
    {
      id: uuid.v4() as string,
      displayName: 'Ole Farwig',
      avatarUrl: null,
    },
    {
      id: uuid.v4() as string,
      displayName: 'Robert Schneider',
      avatarUrl: null,
    },
    {
      id: uuid.v4() as string,
      displayName: 'Thies Hölting',
      avatarUrl: null,
    },
    {
      id: uuid.v4() as string,
      displayName: 'Timon Reihnen',
      avatarUrl: null,
    },
  ],
  addEmptySubexpense: (parentExpenseId: string) => {
    set((state) =>
      produce(state, (draft) => {
        const id = uuid.v4() as string;
        const parentExpense = draft.expenses.find(
          (expense) => expense.id === parentExpenseId
        );
        if (parentExpense) {
          parentExpense.subExpenseIds.push(id);
          draft.subExpenses.push({
            id,
            title: '',
            price: 0,
            sponsorIds: [],
            gainerIds: [],
          });
        }
      })
    );
  },
  removeSubexpense: (parentExpenseId: string, childId: string) => {
    set((state) =>
      produce(state, (draft) => {
        const parentExpense = draft.expenses.find(
          (expense) => expense.id === parentExpenseId
        );
        if (parentExpense) {
          parentExpense.subExpenseIds = parentExpense.subExpenseIds.filter(
            (id) => id !== childId
          );
          draft.subExpenses = draft.subExpenses.filter(
            (subExpense) => subExpense.id !== childId
          );
        }
      })
    );
  },
  getActiveExpense: () =>
    get().expenses.find((expense) => expense.id === get().activeExpenseId) ??
    null,
  setExpenseTitle: (expenseId: string, value: string) =>
    updateExpense(expenseId, (expense) => {
      expense.title = value;
    }),
  setExpensePrice: (expenseId: string, value: number) =>
    updateExpense(expenseId, (expense) => {
      expense.price = value;
    }),
  setSubexpenseTitle: (expenseId: string, value: string) =>
    updateSubexpense(expenseId, (expense) => {
      expense.title = value;
    }),
  setSubexpensePrice: (expenseId: string, value: number) =>
    updateSubexpense(expenseId, (expense) => {
      expense.price = value;
    }),
  setExpenseDate: (expenseId: string, value: Date) =>
    updateExpense(expenseId, (expense) => {
      expense.date = value;
    }),
  addCategoryToExpense: (expenseId: string, categoryId: string) =>
    updateExpense(expenseId, (expense) => {
      expense.categoryIds.push(categoryId);
    }),
  removeCategoryFromExpense: (expenseId: string, categoryId: string) =>
    updateExpense(expenseId, (expense) => {
      expense.categoryIds = expense.categoryIds.filter(
        (id) => id !== categoryId
      );
    }),
  addGainerToSubexpense: (subexpenseId: string, groupMemberId: string) => {
    updateSubexpense(subexpenseId, (expense) => {
      expense.gainerIds.push(groupMemberId);
    });
  },
  removeGainerFromSubexpense: (subexpenseId: string, groupMemberId: string) => {
    updateSubexpense(subexpenseId, (expense) => {
      expense.gainerIds = expense.gainerIds.filter(
        (id) => id !== groupMemberId
      );
    });
  },
  splitExpenseIntoMultiple: (expenseId: string) => {
    set((state) =>
      produce(state, (draft) => {
        const parentExpense = draft.expenses.find(
          (expense) => expense.id === expenseId
        );
        if (parentExpense) {
          const subExpense1Id = uuid.v4() as string;
          const subExpense2Id = uuid.v4() as string;
          parentExpense.subExpenseIds.push(subExpense1Id, subExpense2Id);
          draft.subExpenses.push(
            {
              id: subExpense1Id,
              title: '',
              price: 0,
              sponsorIds: [],
              gainerIds: [],
            },
            {
              id: subExpense2Id,
              title: '',
              price: 0,
              sponsorIds: [],
              gainerIds: [],
            }
          );
        }
      })
    );
  },
}));

function updateExpense(expenseId: string, updater: (expense: Expense) => void) {
  useExpenses.setState((state) =>
    produce(state, (draft) => {
      const expense = draft.expenses.find((exp) => exp.id === expenseId);
      if (expense) {
        updater(expense);
      }
    })
  );
}
function updateSubexpense(
  expenseId: string,
  updater: (expense: SubExpense) => void
) {
  useExpenses.setState((state) =>
    produce(state, (draft) => {
      const subExpense = draft.subExpenses.find((exp) => exp.id === expenseId);
      if (subExpense) {
        updater(subExpense);
      }
    })
  );
}

export default useExpenses;
