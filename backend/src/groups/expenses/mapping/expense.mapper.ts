import {Mapper, Mappings} from 'ts-mapstruct';
import {Injectable} from '@nestjs/common';
import {Expense, Prisma} from '@prisma/client';
import {ExpenseEntity} from "../entities/expense.entity";
import {ExpenseDto} from "../dto/expense.dto";

@Injectable()
@Mapper()
export class ExpenseMapper {
  @Mappings()
  dtoFromEntity(expense: ExpenseEntity): ExpenseDto {
    return new ExpenseDto;
  }

  dtosFromEntities(expenses: ExpenseEntity[]): ExpenseDto[] {
    return expenses.map((expense) =>
        this.dtoFromEntity(expense),
    );
  }

  @Mappings()
  entityFromDb(expense: Expense): ExpenseEntity {
    return new ExpenseEntity;
  }

  entitiesFromDb(expenses: Expense[]): ExpenseEntity[] {
    return expenses.map((expense) =>
      this.entityFromDb(expense),
    );
  }

  @Mappings(
      {target: "categories", expression: "expense.categories.map(category => (category.expenseCategory))"}
  )
  categoryEnhancedEntityFromDb(expense: ExpenseWithCategories): ExpenseEntity {
    return new ExpenseEntity;
  }

  categoryEnhancedEntitiesFromDb(expenses: ExpenseWithCategories[]): ExpenseEntity[] {
    return expenses.map((expense) =>
      this.categoryEnhancedEntityFromDb(expense),
    );
  }
}

const expenseWithCategories = Prisma.validator<Prisma.ExpenseDefaultArgs>()({
  include: {
    categories: {
      include: {
        expenseCategory: true
      }
    }},
})

type ExpenseWithCategories = Prisma.ExpenseGetPayload<typeof expenseWithCategories>