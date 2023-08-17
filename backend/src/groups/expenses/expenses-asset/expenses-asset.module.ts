import { Module } from '@nestjs/common';
import { ExpensesAssetService } from './expenses-asset.service';
import { ExpensesAssetController } from './expenses-asset.controller';

@Module({
  controllers: [ExpensesAssetController],
  providers: [ExpensesAssetService],
})
export class ExpensesAssetModule {}
