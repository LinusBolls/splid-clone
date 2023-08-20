import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { FilestoreService } from './filestore.service';

@Controller('/upload')
export class FilestoreController {
  constructor(private readonly filestoreService: FilestoreService) {}

  @Get(":bucket")
  async getUrl(@Param('bucket') bucket: string) {
    if (!this.filestoreService.buckets.includes(bucket)) {
      throw new HttpException('Invalid upload type', HttpStatus.BAD_REQUEST);
    }
    return this.filestoreService.getUploadMemberPhotoUrl();
  }
}
