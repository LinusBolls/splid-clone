-- CreateTable
CREATE TABLE "Currency" (
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("symbol")
);

-- CreateTable
CREATE TABLE "CurrencyRate" (
    "symbol" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "rateEurBase" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "CurrencyRate_pkey" PRIMARY KEY ("symbol","date")
);
