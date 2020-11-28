import { PartialType } from '@nestjs/mapped-types';
import { CreateRawCardInfoDto } from './create-raw-card-info.dto';

export class UpdateRawCardInfoDto extends PartialType(CreateRawCardInfoDto) {}
