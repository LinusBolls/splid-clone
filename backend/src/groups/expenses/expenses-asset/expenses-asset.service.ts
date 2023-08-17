import { Injectable } from '@nestjs/common';
import { CreateExpensesAssetDto } from './dto/create-expenses-asset.dto';
import { UpdateExpensesAssetDto } from './dto/update-expenses-asset.dto';

@Injectable()
export class ExpensesAssetService {
  create(createExpensesAssetDto: CreateExpensesAssetDto) {
    return 'This action adds a new expensesAsset';
  }

  findAll() {
    return `This action returns all expensesAsset`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expensesAsset`;
  }

  update(id: number, updateExpensesAssetDto: UpdateExpensesAssetDto) {
    return `This action updates a #${id} expensesAsset`;
  }

  remove(id: number) {
    return `This action removes a #${id} expensesAsset`;
  }
}
