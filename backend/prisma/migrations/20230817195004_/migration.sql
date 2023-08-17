/*
  Warnings:

  - You are about to drop the `ExpenseExpenseCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExpenseExpenseCategory" DROP CONSTRAINT "ExpenseExpenseCategory_expenseCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "ExpenseExpenseCategory" DROP CONSTRAINT "ExpenseExpenseCategory_expenseId_fkey";

-- DropTable
DROP TABLE "ExpenseExpenseCategory";

-- CreateTable
CREATE TABLE "MappingExpenseCategory" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expenseId" TEXT NOT NULL,
    "expenseCategoryId" TEXT NOT NULL,

    CONSTRAINT "MappingExpenseCategory_pkey" PRIMARY KEY ("expenseId","expenseCategoryId")
);

-- AddForeignKey
ALTER TABLE "MappingExpenseCategory" ADD CONSTRAINT "MappingExpenseCategory_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "Expense"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MappingExpenseCategory" ADD CONSTRAINT "MappingExpenseCategory_expenseCategoryId_fkey" FOREIGN KEY ("expenseCategoryId") REFERENCES "ExpenseCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
