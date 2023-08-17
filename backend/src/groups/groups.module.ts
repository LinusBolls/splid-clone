import {Module} from '@nestjs/common';
import {GroupsService} from './groups.service';
import {GroupsController} from './groups.controller';
import {CurrenciesModule} from "../currencies/currencies.module";

@Module({
  controllers: [GroupsController],
  providers: [GroupsService],
  imports: [CurrenciesModule]
})
export class GroupsModule {}
