import {Mapper, Mappings} from 'ts-mapstruct';
import {Injectable} from '@nestjs/common';
import {GroupMemberExpense, Prisma} from '@prisma/client';
import {GroupMemberExpenseDto} from "../dto/group-member-expenses.dto";
import {GroupMemberExpenseEntity} from "../entities/group-member-expense.entity";

@Injectable()
@Mapper()
export class GroupMemberExpenseMapper {
  @Mappings()
  dtoFromEntity(expense: GroupMemberExpenseEntity): GroupMemberExpenseDto {
    return new GroupMemberExpenseDto();
  }

  dtosFromEntities(expenses: GroupMemberExpenseEntity[]): GroupMemberExpenseDto[] {
    return expenses.map((expense) => this.dtoFromEntity(expense));
  }

  @Mappings(
      {target: "amount", expression: "Big(expense.amount)"},
      {target: "amountReferenceCurrency", expression: "Big(expense.amountReferenceCurrency)"}
  )
  entityFromDb(expense: GroupMemberExpense): GroupMemberExpenseEntity {
    return new GroupMemberExpenseEntity();
  }

  entitiesFromDb(expenses: GroupMemberExpense[]): GroupMemberExpenseEntity[] {
    return expenses.map((expense) => this.entityFromDb(expense));
  }

  @Mappings()
  groupMemberPaymentsEnhancedEntityFromDb(expense: GroupMemberExpenseWithGroupMember): GroupMemberExpenseEntity {
    return new GroupMemberExpenseEntity();
  }

  groupMemberPaymentsEnhancedEntitiesFromDb(
    expenses: GroupMemberExpenseWithGroupMember[],
  ): GroupMemberExpenseEntity[] {
    return expenses.map((expense) =>
      this.groupMemberPaymentsEnhancedEntityFromDb(expense),
    );
  }
}

const groupMemberExpenseWithGroupMember = Prisma.validator<Prisma.GroupMemberExpenseDefaultArgs>()({
  include: {
    groupMember: true
  },
});

type GroupMemberExpenseWithGroupMember = Prisma.GroupMemberExpenseGetPayload<
  typeof groupMemberExpenseWithGroupMember
>;
