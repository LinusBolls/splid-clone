import uuid from 'react-native-uuid';
import { create } from 'zustand';

import { Expense } from './expensesStore';

export interface Share {
  id: string;
  memberId: string;

  percentage: number;
}
export interface SubexpenseDraft {
  id: string;

  shares: Share[];

  title: string;
  price: number;
}
export interface ExpenseDraftStore {
  title: string;
  description: string;
  date: Date;
  categoryIds: string[];
  subexpenses: SubexpenseDraft[];

  sponsorShares: Share[];

  actions: {
    setTitle: (title: string) => void;
    setDescription: (description: string) => void;
    setDate: (date: Date) => void;
    addCategory: (categoryId: string) => void;
    removeCategory: (categoryId: string) => void;
    setTotalAmount: (totalAmount: number) => void;

    addSponsorShare: (memberId: string) => void;
    removeSponsorShare: (memberId: string) => void;
    setSponsorSharePercentage: (memberId: string, percentage: number) => void;

    createEmptySubexpense: () => SubexpenseDraft;
    deleteSubexpense: (subexpenseId: string) => void;
    setSubexpenseTitle: (subexpenseId: string, title: string) => void;
    setSubexpensePrice: (subexpenseId: string, price: number) => void;

    addSubexpenseShare: (subexpenseId: string, memberId: string) => void;
    removeSubexpenseShare: (subexpenseId: string, memberId: string) => void;
    setSubexpenseSharePercentage: (
      subexpenseId: string,
      memberId: string,
      percentage: number
    ) => void;

    getDraft: () => Omit<Expense, 'id' | 'groupId'>;
    clear: () => void;

    getSubexpenseDrafts: () => SubexpenseDraft[];

    splitTotalEvenlyAcrossSubexpenses: () => void;
  };
}
export const useExpenseDraftStore = create<ExpenseDraftStore>((set, get) => ({
  title: '',
  description: '',
  date: new Date(),
  categoryIds: [],
  subexpenses: [
    {
      id: uuid.v4() as string,
      shares: [],
      title: '',
      price: 0,
    },
  ],
  sponsorShares: [],

  actions: {
    setTitle: (title: string) => {
      set((store) => ({ ...store, title }));
    },
    setDescription: (description: string) => {
      set((store) => ({ ...store, description }));
    },
    setDate: (date: Date) => {
      set((store) => ({ ...store, date }));
    },
    addCategory: (categoryId: string) => {
      set((store) => ({
        ...store,
        categoryIds: [...store.categoryIds, categoryId],
      }));
    },
    removeCategory: (categoryId: string) => {
      set((store) => ({
        ...store,
        categoryIds: store.categoryIds.filter((i) => i !== categoryId),
      }));
    },
    setTotalAmount: (totalAmount) => {
      set((store) => ({
        subexpenses: store.subexpenses.map((i) => ({
          ...i,
          price: totalAmount / store.subexpenses.length,
        })),
      }));
    },
    addSponsorShare: (memberId: string) => {
      const newShare = { id: uuid.v4() as string, memberId, percentage: 123 };

      set((store) => ({
        sponsorShares: [...store.sponsorShares, newShare],
      }));
    },
    removeSponsorShare: (memberId: string) => {
      set((store) => ({
        sponsorShares: store.sponsorShares.filter(
          (i) => i.memberId !== memberId
        ),
      }));
    },
    setSponsorSharePercentage: (memberId: string, percentage: number) => {
      set((store) => ({
        sponsorShares: store.sponsorShares.map((i) =>
          i.memberId === memberId ? { ...i, percentage } : i
        ),
      }));
    },
    createEmptySubexpense: () => {
      const subexpense = {
        id: uuid.v4() as string,
        title: '',
        price: 0,
        shares: [],
      };
      set((store) => ({
        ...store,
        subexpenses: [...store.subexpenses, subexpense],
      }));
      return subexpense;
    },
    deleteSubexpense: (subexpenseId: string) => {
      if (get().subexpenses.length < 2) {
        throw new Error(
          'expenseDraftStore.actions.deleteSubexpense: attempted to delete last subexpense of expense but an expense must always have one or more subexpenses'
        );
      }
      set((store) => ({
        ...store,
        subexpenses: store.subexpenses.filter(
          (subexpense) => subexpense.id !== subexpenseId
        ),
      }));
    },
    setSubexpenseTitle: (subexpenseId: string, title: string) => {
      set((store) => {
        const subexpenses = store.subexpenses.map((subexpense) => {
          if (subexpense.id === subexpenseId) {
            return { ...subexpense, title };
          }
          return subexpense;
        });
        return { ...store, subexpenses };
      });
    },
    setSubexpensePrice: (subexpenseId: string, price: number) => {
      set((store) => {
        const subexpenses = store.subexpenses.map((subexpense) => {
          if (subexpense.id === subexpenseId) {
            return { ...subexpense, price };
          }
          return subexpense;
        });
        return { ...store, subexpenses };
      });
    },
    addSubexpenseShare: (subexpenseId: string, memberId: string) => {
      set((store) => {
        const subexpenses = store.subexpenses.map((subexpense) => {
          if (subexpense.id === subexpenseId) {
            const share = {
              id: uuid.v4() as string,
              memberId,
              percentage: 0,
            };
            return { ...subexpense, shares: [...subexpense.shares, share] };
          }
          return subexpense;
        });
        return { ...store, subexpenses };
      });
    },
    removeSubexpenseShare: (subexpenseId: string, memberId: string) => {
      set((store) => {
        const subexpenses = store.subexpenses.map((subexpense) => {
          if (subexpense.id === subexpenseId) {
            return {
              ...subexpense,
              shares: subexpense.shares.filter(
                (share) => share.memberId !== memberId
              ),
            };
          }
          return subexpense;
        });
        return { ...store, subexpenses };
      });
    },
    setSubexpenseSharePercentage: (
      subexpenseId: string,
      memberId: string,
      percentage: number
    ) => {
      set((store) => {
        const subexpenses = store.subexpenses.map((subexpense) => {
          if (subexpense.id === subexpenseId) {
            const shares = subexpense.shares.map((share) => {
              if (share.memberId === memberId) {
                return { ...share, percentage };
              }
              return share;
            });
            return { ...subexpense, shares };
          }
          return subexpense;
        });
        return { ...store, subexpenses };
      });
    },
    getDraft: () => {
      const store = get();

      const draft: Omit<Expense, 'id' | 'groupId'> = {
        sponsorShares: store.sponsorShares,
        title: store.title,
        description: store.description,
        date: store.date,
        subExpenseIds: store.subexpenses.map((i) => i.id),
        categoryIds: store.categoryIds,
      };
      return draft;
    },
    clear: () => {
      set(() => ({
        title: '',
        description: '',
        date: new Date(),
        categoryIds: [],
        subexpenses: [
          {
            id: uuid.v4() as string,
            shares: [],
            title: '',
            price: 0,
          },
        ],
        sponsorShares: [],
      }));
    },
    getSubexpenseDrafts: () => {
      return get().subexpenses;
    },
    splitTotalEvenlyAcrossSubexpenses: () => {
      const total = get().subexpenses.reduce((sum, i) => sum + i.price, 0);

      set((store) => ({
        subexpenses: store.subexpenses.map((i) => ({
          ...i,
          price: total / store.subexpenses.length,
        })),
      }));
    },
  },
}));
