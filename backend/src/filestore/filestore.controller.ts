import { Controller, Get } from '@nestjs/common';
import { FilestoreService } from './filestore.service';

@Controller('/upload/:bucket')
export class FilestoreController {
  constructor(private readonly filestoreService: FilestoreService) {}

  @Get()
  async getUrl() {
    return this.filestoreService.getUploadMemberPhotoUrl();
  }
}
