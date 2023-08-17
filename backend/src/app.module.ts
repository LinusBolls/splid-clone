import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GroupModule } from './group/group.module';
import { GroupMembersModule } from './group-members/group-members.module';
import { ExpensesModule } from './expenses/expenses.module';
import { CurrenciesModule } from './currencies/currencies.module';

@Module({
  imports: [GroupModule, GroupMembersModule, ExpensesModule, CurrenciesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
