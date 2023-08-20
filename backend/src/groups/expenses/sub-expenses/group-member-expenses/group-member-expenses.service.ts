import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UpdateGroupMemberExpenseDto } from './dto/update-group-member-expense.dto';
import { GROUP_MEMBER_EXPENSE_ROLE, PrismaClient } from '@prisma/client';
import Big from 'big.js';
import { CurrenciesService } from '../../../../currencies/currencies.service';
import { GroupsService } from '../../../groups.service';
import { GroupMemberExpenseEntity } from './entities/group-member-expense.entity';
import { GroupMemberExpenseMapper } from './mapping/group-member-expense.mapper';

const prisma = new PrismaClient();
@Injectable()
export class GroupMemberExpensesService {
  constructor(
    private readonly currenciesService: CurrenciesService,
    @Inject(forwardRef(() => GroupsService))
    private groupsService: GroupsService,
    private readonly groupMemberExpenseMapper: GroupMemberExpenseMapper,
  ) {}

  async findAll(subExpenseId: string): Promise<GroupMemberExpenseEntity[]> {
    const dbResult = await prisma.groupMemberExpense.findMany({
      where: {
        subExpenseId,
      },
      include: {
        groupMember: true,
      },
    });

    return this.groupMemberExpenseMapper.groupMemberPaymentsEnhancedEntitiesFromDb(
      dbResult,
    );
  }

  async findAllExpensesByGroupMemberId(groupMemberId: string) {
    const dbResult = await prisma.groupMemberExpense.findMany({
      where: {
        groupMemberId,
      },
      include: {
        groupMember: true,
      },
    });

    return this.groupMemberExpenseMapper.entitiesFromDb(
      dbResult,
    );
  }

  async findOne(id: string, subExpenseId: string) {
    const result = await prisma.groupMemberExpense.findFirst({
      where: {
        id,
        subExpenseId,
      },
      include: {
        groupMember: true,
      },
    });

    return this.groupMemberExpenseMapper.groupMemberPaymentsEnhancedEntityFromDb(
      result,
    );
  }

  async groupMemberHasExpenses(groupMemberId: string) {
    return (
      (await prisma.groupMemberExpense.findFirst({
        where: {
          groupMemberId,
        },
      })) !== null
    );
  }

  async exists(id: string, subExpenseId: string) {
    return (
      (await prisma.groupMemberExpense.findFirst({
        where: {
          id,
          subExpenseId,
        },
      })) !== null
    );
  }

  async update(
    updateGroupMemberExpenseDtos: UpdateGroupMemberExpenseDto[],
    subExpenseId: string,
    groupId: string,
  ) {
    let gainerSum = Big(0);
    let sponsorSum = Big(0);
    const currencies = [];

    for (let updateGroupMemberExpenseDto of updateGroupMemberExpenseDtos) {
      if (updateGroupMemberExpenseDto.role === 'GAINER') {
        gainerSum = gainerSum.add(updateGroupMemberExpenseDto.amount);
      }

      if (updateGroupMemberExpenseDto.role === 'SPONSOR') {
        sponsorSum = sponsorSum.add(updateGroupMemberExpenseDto.amount);
      }

      if (!currencies.includes(updateGroupMemberExpenseDto.currency)) {
        currencies.push(updateGroupMemberExpenseDto.currency);
      }
    }

    if (!gainerSum.eq(sponsorSum)) {
      throw new HttpException(
        "Amounts of gains and sponsorships don't match",
        HttpStatus.BAD_REQUEST,
      );
    }

    if (currencies.length > 1) {
      throw new HttpException(
        'Amounts must be in same currency',
        HttpStatus.BAD_REQUEST,
      );
    }

    for (const currency of currencies) {
      if (
        (await this.currenciesService.findOneCurrency(currency, new Date())) ===
        null
      ) {
        throw new HttpException(
          'Currency not found: ' + currency,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const groupCurrency = (await this.groupsService.findOne(groupId)).currency;

    await prisma.groupMemberExpense.deleteMany({
      where: {
        subExpenseId,
      },
    });

    const king = await Promise.all(
      updateGroupMemberExpenseDtos.map(async (groupMemberExpense) => ({
        ...groupMemberExpense,
        amount: groupMemberExpense.amount.toString(),
        amountReferenceCurrency: (
          await this.currenciesService.convert(
            groupMemberExpense.currency,
            groupCurrency,
            groupMemberExpense.amount,
            groupMemberExpense.date,
          )
        ).toString(),
        subExpenseId,
      })),
    );

    await prisma.groupMemberExpense.createMany({
      data: king,
    });

    return this.findAll(subExpenseId);
  }

  remove(id: string, subExpenseId: string) {
    return prisma.groupMemberExpense.delete({
      where: {
        id,
        subExpenseId,
      },
    });
  }

  async removeAllGroupMemberExpensesBelongingToSubExpense(
    subExpenseId: string,
  ) {
    const findResults = await this.findAll(subExpenseId);

    if (findResults.length === 0) return;

    return prisma.groupMemberExpense.deleteMany({
      where: {
        subExpenseId,
      },
    });
  }
}
