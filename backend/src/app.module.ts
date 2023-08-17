import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GroupModule } from './groups/groups.module';
import { CurrenciesModule } from './currencies/currencies.module';

@Module({
  imports: [GroupModule, CurrenciesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
