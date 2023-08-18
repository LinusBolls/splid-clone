/*
  Warnings:

  - You are about to drop the column `content` on the `GroupMemberPaymentDetail` table. All the data in the column will be lost.
  - Added the required column `detail` to the `GroupMemberPaymentDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GroupMemberPaymentDetail" DROP COLUMN "content",
ADD COLUMN     "detail" TEXT NOT NULL;
