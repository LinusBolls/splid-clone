import { Mapper, Mappings } from 'ts-mapstruct';
import { Injectable } from '@nestjs/common';
import { Prisma, SubExpense } from '@prisma/client';
import { SubExpenseEntity } from '../entities/sub-expense.entity';
import { SubExpenseDto } from '../dto/sub-expense.dto';

@Injectable()
@Mapper()
export class SubExpenseMapper {
  @Mappings()
  dtoFromEntity(expense: SubExpenseEntity): SubExpenseDto {
    return new SubExpenseDto();
  }

  dtosFromEntities(expenses: SubExpenseEntity[]): SubExpenseDto[] {
    return expenses.map((expense) => this.dtoFromEntity(expense));
  }

  @Mappings()
  entityFromDb(expense: SubExpense): SubExpenseEntity {
    return new SubExpenseEntity();
  }

  entitiesFromDb(expenses: SubExpense[]): SubExpenseEntity[] {
    return expenses.map((expense) => this.entityFromDb(expense));
  }

  @Mappings()
  groupMemberPaymentsEnhancedEntityFromDb(
    expense: SubExpenseWithGroupMemberExpenses,
  ): SubExpenseEntity {
    return new SubExpenseEntity();
  }

  groupMemberPaymentsEnhancedEntitiesFromDb(
    expenses: SubExpenseWithGroupMemberExpenses[],
  ): SubExpenseEntity[] {
    return expenses.map((expense) =>
      this.groupMemberPaymentsEnhancedEntityFromDb(expense),
    );
  }
}

const subExpenseWithGroupMemberExpenses =
  Prisma.validator<Prisma.SubExpenseDefaultArgs>()({
    include: {
      groupMemberExpenses: {
        include: {
          groupMember: true,
        },
      },
    },
  });

type SubExpenseWithGroupMemberExpenses = Prisma.SubExpenseGetPayload<
  typeof subExpenseWithGroupMemberExpenses
>;
