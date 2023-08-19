import {Group} from "../../entities/group.entity";
import {ExpensesAssetEntity} from "../expenses-asset/entities/expenses-asset.entity";
import {SubExpenseEntity} from "../sub-expenses/entities/sub-expense.entity";
import {ExpensesCategoryEntity} from "../../expense-categories/entities/expense-category.entity";
import {Expose} from "class-transformer";

export class ExpenseEntity {
    @Expose() id: string
    @Expose() createdAt: Date
    @Expose() updatedAt: Date
    @Expose() name: String
    @Expose() description: string
    @Expose() location: string

    @Expose() assets: ExpensesAssetEntity[]
    @Expose() subExpenses: SubExpenseEntity[]
    @Expose() group: Group
    @Expose() categories: ExpensesCategoryEntity[]
}
