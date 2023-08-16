import { useState } from "react";

import Expense from "../models/Expense.model";

export default function useExpenses() {

    const [expenses, setExpenses] = useState([
        new Expense(),
    ]);

    function addSubexpense(parentExpenseId: string) {

        const parentExpense = expenses.find(i => i.id === parentExpenseId);

        if (!parentExpense) return

        const newExpense = new Expense();

        parentExpense.addChild(newExpense);
    }

    return {
        expenses,
        addSubexpense,
        // setExpenseTitle
        // setExpenseDescription
        // addCategoryToExpense
        // removeCategoryFromExpense
        // setExpenseAmount
    }
}