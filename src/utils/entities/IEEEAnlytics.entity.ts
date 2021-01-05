import { ParsebleCSV } from './parseble.abstract';
import { Gender } from '@prisma/client';
import { IsInt, IsEmail, IsEnum, IsOptional } from 'class-validator';
import _ from 'lodash';

export class IEEEAnlyticsElement {
  @IsInt()
  ieeeID: number;

  @IsInt()
  year: number;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;

  private static transformer = _.cond<
    { f: string | number; v: string },
    string
  >([
    [
      ({ f }) => f === 'gender',
      ({ v }) =>
        v === 'Unknown' ? null : v === 'Male' ? Gender.male : Gender.female,
    ],

    [() => true, ({ v }) => v],
  ]);

  private static headerParser = _.cond<number, string>([
    [(e) => e === 3, () => 'ieeeID'],
    [(e) => e === 14, () => 'year'],
    [(e) => e === 9, () => 'email'],
    [(e) => e === 12, () => 'gender'],
    [() => true, () => ''],
  ]);

  static parser = new ParsebleCSV(
    IEEEAnlyticsElement,
    (_header, index) => IEEEAnlyticsElement.headerParser(index),
    (v, f) => IEEEAnlyticsElement.transformer({ v, f }),
  );
}
