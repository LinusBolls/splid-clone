export class SubExpenseDto {
  id: string;
  createdAt: Date;

  updatedAt: Date;

  priceReferenceCurrency: number;
  price: number;
  currency: string;

  expenseId: string;
  groupMember: GroupMemberExpenseDto[];
}
