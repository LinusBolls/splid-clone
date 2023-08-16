import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GroupModule } from './group/group.module';
import { ReceiptModule } from './receipt/receipt.module';

@Module({
  imports: [GroupModule, ReceiptModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
