-- CreateTable
CREATE TABLE "ExpenseExpenseCategory" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expenseId" TEXT NOT NULL,
    "expenseCategoryId" TEXT NOT NULL,

    CONSTRAINT "ExpenseExpenseCategory_pkey" PRIMARY KEY ("expenseId","expenseCategoryId")
);

-- AddForeignKey
ALTER TABLE "ExpenseExpenseCategory" ADD CONSTRAINT "ExpenseExpenseCategory_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "Expense"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenseExpenseCategory" ADD CONSTRAINT "ExpenseExpenseCategory_expenseCategoryId_fkey" FOREIGN KEY ("expenseCategoryId") REFERENCES "ExpenseCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
