-- CreateTable
CREATE TABLE "GroupMemberPaymentDetail" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "groupMemberId" TEXT NOT NULL,

    CONSTRAINT "GroupMemberPaymentDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GroupMemberPaymentDetail" ADD CONSTRAINT "GroupMemberPaymentDetail_groupMemberId_fkey" FOREIGN KEY ("groupMemberId") REFERENCES "GroupMember"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
