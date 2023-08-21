import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GroupsModule } from './groups/groups.module';
import { CurrenciesModule } from './currencies/currencies.module';

@Module({
  imports: [GroupsModule, CurrenciesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
