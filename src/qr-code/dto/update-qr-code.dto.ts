import { PartialType } from '@nestjs/mapped-types';
import { CreateQrCodeDto } from './create-qr-code.dto';

export class UpdateQrCodeDto extends PartialType(CreateQrCodeDto) {}
