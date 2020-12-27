import { MemberPicturesService } from '../services/member-pictures.service';
import { Controller, Get, SetMetadata, UseGuards } from '@nestjs/common';
import { LocalGuard } from 'src/guards/local-guard/local.guard';

@Controller('member/pictures')
@UseGuards(LocalGuard)
export class MemberPicturesController {
  constructor(private readonly memberPicturesService: MemberPicturesService) {}

  @SetMetadata('NODE_ENV', 'development')
  @Get('download')
  async downloadPics() {
    return this.memberPicturesService.downloadImage();
  }
}
