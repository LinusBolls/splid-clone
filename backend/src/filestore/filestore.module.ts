import { Module } from "@nestjs/common";
import { FilestoreController } from "./filestore.controller";
import { FilestoreService } from "./filestore.service";

@Module({
  controllers: [FilestoreController],
  providers: [FilestoreService],
})
export class FilestoreModule {}
