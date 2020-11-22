import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateQrCodeDto {
  @IsNotEmpty()
  @IsString()
  public code: string;

  @IsNotEmpty()
  @IsString()
  public id: string;
}
