import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExpensesAssetService } from './expenses-asset.service';
import { CreateExpensesAssetDto } from './dto/create-expenses-asset.dto';
import { UpdateExpensesAssetDto } from './dto/update-expenses-asset.dto';

@Controller('expenses-asset')
export class ExpensesAssetController {
  constructor(private readonly expensesAssetService: ExpensesAssetService) {}

  @Post()
  create(@Body() createExpensesAssetDto: CreateExpensesAssetDto) {
    return this.expensesAssetService.create(createExpensesAssetDto);
  }

  @Get()
  findAll() {
    return this.expensesAssetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expensesAssetService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpensesAssetDto: UpdateExpensesAssetDto) {
    return this.expensesAssetService.update(+id, updateExpensesAssetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expensesAssetService.remove(+id);
  }
}
