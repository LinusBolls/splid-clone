/*
  Warnings:

  - The primary key for the `CurrencyRate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `rateEurQuote` on the `CurrencyRate` table. All the data in the column will be lost.
  - You are about to drop the column `symbol` on the `CurrencyRate` table. All the data in the column will be lost.
  - Added the required column `currencySymbol` to the `CurrencyRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rateEurBase` to the `CurrencyRate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CurrencyRate" DROP CONSTRAINT "CurrencyRate_pkey",
DROP COLUMN "rateEurQuote",
DROP COLUMN "symbol",
ADD COLUMN     "currencySymbol" TEXT NOT NULL,
ADD COLUMN     "rateEurBase" DECIMAL(65,30) NOT NULL,
ADD CONSTRAINT "CurrencyRate_pkey" PRIMARY KEY ("currencySymbol", "date");

-- AddForeignKey
ALTER TABLE "CurrencyRate" ADD CONSTRAINT "CurrencyRate_currencySymbol_fkey" FOREIGN KEY ("currencySymbol") REFERENCES "Currency"("symbol") ON DELETE RESTRICT ON UPDATE CASCADE;
