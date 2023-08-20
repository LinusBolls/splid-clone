import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GroupsModule } from './groups/groups.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { FilestoreService } from './filestore/filestore.service';
import { FilestoreController } from './filestore/filestore.controller';
import { FilestoreModule } from './filestore/filestore.module';

@Module({
  imports: [GroupsModule, CurrenciesModule, FilestoreModule],
  controllers: [AppController, FilestoreController],
  providers: [AppService, FilestoreService],
})
export class AppModule {}
