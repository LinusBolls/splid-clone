/*
  Warnings:

  - You are about to drop the column `currency` on the `SubExpense` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `SubExpense` table. All the data in the column will be lost.
  - You are about to drop the column `priceReferenceCurrency` on the `SubExpense` table. All the data in the column will be lost.
  - Added the required column `currency` to the `GroupMemberExpense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `GroupMemberExpense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceReferenceCurrency` to the `GroupMemberExpense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GroupMemberExpense" ADD COLUMN     "currency" TEXT NOT NULL,
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "priceReferenceCurrency" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "SubExpense" DROP COLUMN "currency",
DROP COLUMN "price",
DROP COLUMN "priceReferenceCurrency";
