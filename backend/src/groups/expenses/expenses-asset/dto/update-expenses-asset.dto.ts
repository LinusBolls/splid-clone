import { PartialType } from '@nestjs/mapped-types';
import { CreateExpensesAssetDto } from './create-expenses-asset.dto';

export class UpdateExpensesAssetDto extends PartialType(CreateExpensesAssetDto) {}
