/*
  Warnings:

  - The primary key for the `Currency` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CurrencyRate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `currencySymbol` on the `CurrencyRate` table. All the data in the column will be lost.
  - Added the required column `date` to the `Currency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `symbol` to the `CurrencyRate` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CurrencyRate" DROP CONSTRAINT "CurrencyRate_currencySymbol_fkey";

-- AlterTable
ALTER TABLE "Currency" DROP CONSTRAINT "Currency_pkey",
ADD COLUMN     "date" DATE NOT NULL,
ADD CONSTRAINT "Currency_pkey" PRIMARY KEY ("symbol", "date");

-- AlterTable
ALTER TABLE "CurrencyRate" DROP CONSTRAINT "CurrencyRate_pkey",
DROP COLUMN "currencySymbol",
ADD COLUMN     "symbol" TEXT NOT NULL,
ADD CONSTRAINT "CurrencyRate_pkey" PRIMARY KEY ("symbol", "date");

-- AddForeignKey
ALTER TABLE "CurrencyRate" ADD CONSTRAINT "CurrencyRate_symbol_date_fkey" FOREIGN KEY ("symbol", "date") REFERENCES "Currency"("symbol", "date") ON DELETE RESTRICT ON UPDATE CASCADE;
