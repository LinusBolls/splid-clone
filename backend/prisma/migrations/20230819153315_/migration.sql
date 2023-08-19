-- AlterTable
ALTER TABLE "Expense" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "location" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Group" ALTER COLUMN "description" DROP NOT NULL;
