/*
  Warnings:

  - You are about to drop the column `expenseId` on the `ExpenseCategory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExpenseCategory" DROP CONSTRAINT "ExpenseCategory_expenseId_fkey";

-- AlterTable
ALTER TABLE "ExpenseCategory" DROP COLUMN "expenseId";
