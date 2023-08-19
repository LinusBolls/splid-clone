import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GroupsModule } from './groups/groups.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { FilestoreService } from './filestore/filestore.service';
import { FilestoreController } from './filestore/filestore.controller';

@Module({
  imports: [GroupsModule, CurrenciesModule],
  controllers: [AppController, FilestoreController],
  providers: [AppService, FilestoreService],
})
export class AppModule {}
