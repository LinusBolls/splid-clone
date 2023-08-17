import { createContext } from 'react';

export interface Expense {
  id: string;

  title: string;

  price: number;
}

export interface ExpensesContextType {
  expenses: Expense[];
  // expenses ({ id: uuid.v4(), title: '', profiteers: [], price: 0 })
  // selectedExpenseId
  //
}
// @ts-ignore
const ExpensesContext = createContext<ExpensesContextType>();
export default ExpensesContext;
