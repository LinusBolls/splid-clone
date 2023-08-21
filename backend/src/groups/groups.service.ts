import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Prisma, PrismaClient } from '@prisma/client';
import { CurrenciesService } from '../currencies/currencies.service';
import { ExpensesService } from './expenses/expenses.service';
import { ExpenseCategoriesService } from './expense-categories/expense-categories.service';
import { GroupMembersService } from './group-members/group-members.service';
import { PaymentService } from './payment/payment.service';

const prisma = new PrismaClient();

@Injectable()
export class GroupsService {
  constructor(
    private readonly expenseCategoryService: ExpenseCategoriesService,
    private readonly currenciesService: CurrenciesService,
    private readonly expenseService: ExpensesService,
    private readonly groupMembersService: GroupMembersService,
    private readonly paymentService: PaymentService,
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    if (
      (await this.currenciesService.findOneCurrency(
        createGroupDto.currency,
        new Date(),
      )) === null
    ) {
      throw new HttpException('Currency unknown', HttpStatus.BAD_REQUEST);
    }

    const group = await prisma.group.create({
      data: {
        ...createGroupDto,
        inviteCode: this.generateInviteCode(),
      },
    });

    await this.initializeDefaultCategories(group.id);

    return group;
  }

  findOne(id: string) {
    return prisma.group.findFirst({
      where: {
        id,
      },
    });
  }

  findAllByInviteCode(inviteCode: string) {
    return prisma.group.findMany({
      where: {
        inviteCode,
      },
    });
  }

  async exists(id: string) {
    return (
      (await prisma.group.findFirst({
        where: {
          id,
        },
      })) !== null
    );
  }

  update(id: string, updateGroupDto: UpdateGroupDto) {
    return prisma.group.update({
      where: {
        id,
      },
      data: updateGroupDto,
    });
  }

  async remove(id: string) {
    //TODO: prisma transaction
    try {
      await this.expenseService.removeAllByGroupId(id);

      await this.paymentService.removeAllByGroupId(id);

      await this.expenseCategoryService.removeAllByGroupId(id);

      await this.groupMembersService.removeAllByGroupId(id);

      await prisma.group.delete({
        where: {
          id,
        },
      });
    } catch (e) {
      console.error(e);
      //TODO: Doesn't work needs to be fixed
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      ) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  private generateInviteCode() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    let counter = 0;

    while (counter <= 10) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }

    return result;
  }

  private async initializeDefaultCategories(groupId: string) {
    const defaults = [
      {
        name: 'Transport',
        groupId,
      },
      {
        name: 'Groceries',
        groupId,
      },
      {
        name: 'Restaurant',
        groupId,
      },
      {
        name: 'Subscription',
        groupId,
      },
      {
        name: 'Entertainment',
        groupId,
      },
      {
        name: 'Alcohol',
        groupId,
      },
      {
        name: 'Clothing',
        groupId,
      },
    ];

    return this.expenseCategoryService.createBulk(defaults, groupId);
  }
}
