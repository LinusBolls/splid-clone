class GroupMemberExpenseDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  amount: number;
  role: GroupMemberRole;

  subExpenseId: string;
  groupMemberId: string;
 
}

enum GroupMemberRole{
  Sponser,
  Gainer
}
