/*
  Warnings:

  - Added the required column `name` to the `SubExpense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExpenseAsset" ADD COLUMN     "subExpenseId" TEXT;

-- AlterTable
ALTER TABLE "SubExpense" ADD COLUMN     "name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ExpenseAsset" ADD CONSTRAINT "ExpenseAsset_subExpenseId_fkey" FOREIGN KEY ("subExpenseId") REFERENCES "SubExpense"("id") ON DELETE SET NULL ON UPDATE CASCADE;
