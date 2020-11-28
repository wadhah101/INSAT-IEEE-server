import { PrismaService } from '../../../prisma/prisma.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { RawCardInfoService } from './raw-card-info.service';
import { CreateRawCardInfoDto } from './dto/create-raw-card-info.dto';
import { UpdateRawCardInfoDto } from './dto/update-raw-card-info.dto';

@Controller('raw-card-info')
export class RawCardInfoController {
  constructor(private readonly rawCardInfoService: RawCardInfoService) {}

  @Post()
  async create(@Body() createRawCardInfoDto: CreateRawCardInfoDto) {
    return this.rawCardInfoService.create(createRawCardInfoDto);
  }

  @Get()
  async findAll() {
    return this.rawCardInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rawCardInfoService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateRawCardInfoDto: UpdateRawCardInfoDto,
  ) {
    return this.rawCardInfoService.update(+id, updateRawCardInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rawCardInfoService.remove(+id);
  }
}
