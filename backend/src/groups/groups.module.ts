import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import {CurrenciesService} from "../currencies/currencies.service";

@Module({
  controllers: [GroupsController],
  providers: [GroupsService, CurrenciesService],
})
export class GroupsModule {}
