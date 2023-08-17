/*
  Warnings:

  - You are about to drop the column `rateEurBase` on the `CurrencyRate` table. All the data in the column will be lost.
  - Added the required column `rateEurQuote` to the `CurrencyRate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CurrencyRate" DROP COLUMN "rateEurBase",
ADD COLUMN     "rateEurQuote" DECIMAL(65,30) NOT NULL;
