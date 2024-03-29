import { Gender } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import _ from 'lodash';
import { ParserCSV } from './parseble.abstract';

export class AmiraSheetElement {
  @IsNumber()
  ieeeID: number;

  @IsNumber()
  @IsOptional()
  studyLevel: number;

  @IsOptional()
  @IsUrl()
  fbLink?: string;

  @IsOptional()
  @IsEmail()
  personalEmail: string;

  @IsOptional()
  @IsString()
  studyField: string;

  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;

  @IsOptional()
  @IsNumber()
  phoneNumber: number;

  private static transformer = _.cond<
    { f: string | number; v: string },
    string
  >([
    [
      ({ f }) => f === 'gender',
      ({ v }) => (v && v === 'Female' ? Gender.female : Gender.male),
    ],
    [
      ({ f }) => f === 'phoneNumber',
      ({ v }) => `${Number(v) % Math.pow(10, 8)}`,
    ],
    [() => true, ({ v }) => (v === '' ? null : v)],
  ]);

  private static headerTransformer = _.cond<
    { index: number; field: string },
    string
  >([
    [({ index }) => index === 16, () => 'ieeeID'],
    [({ index }) => index === 18, () => 'gender'],
    [({ index }) => index === 3, () => 'personalEmail'],
    [({ index }) => index === 4, () => 'phoneNumber'],
    [({ index }) => index === 5, () => 'fbLink'],
    [({ index }) => index === 6, () => 'studyField'],
    [({ index }) => index === 7, () => 'studyLevel'],
    [() => true, ({ field }) => field],
  ]);

  static parser = new ParserCSV(
    AmiraSheetElement,
    (header, index) =>
      AmiraSheetElement.headerTransformer({ index, field: header }),
    (value, field) => AmiraSheetElement.transformer({ f: field, v: value }),
  );
}
