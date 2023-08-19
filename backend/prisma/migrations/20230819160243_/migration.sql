/*
  Warnings:

  - You are about to drop the column `price` on the `GroupMemberExpense` table. All the data in the column will be lost.
  - You are about to drop the column `priceReferenceCurrency` on the `GroupMemberExpense` table. All the data in the column will be lost.
  - Added the required column `amountReferenceCurrency` to the `GroupMemberExpense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GroupMemberExpense" DROP COLUMN "price",
DROP COLUMN "priceReferenceCurrency",
ADD COLUMN     "amountReferenceCurrency" DECIMAL(65,30) NOT NULL;
