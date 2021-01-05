import { ParsebleCSV } from './../../../entities/parseble.abstract';
import { plainToClass } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  validateSync,
} from 'class-validator';
import _ from 'lodash';
import Papa from 'papaparse';

export class CardFormV2Raw {
  @IsDate()
  timeStamp: Date;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  personalEmail: string;

  @IsNumber()
  phoneNumber: number;

  @IsNumber()
  ieeeID: number;

  @IsNotEmpty()
  @IsString()
  pictureID: string;

  private static headerTransformer = _.cond<number, string>([
    ...([
      [0, 'timeStamp'],
      [1, 'fullName'],
      [2, 'personalEmail'],
      [3, 'phoneNumber'],
      [4, 'ieeeID'],
      [5, 'pictureID'],
    ].map((e) => [(ind) => ind === e[0], () => e[1]]) as any),

    // else
    [
      () => true,
      (e) => {
        console.log('unexpected header ', e);
        return `${e}`;
      },
    ],
  ]);

  /**
   * f : field
   * v : value
   */
  private static transformer = _.cond<
    { v: string; f: string | number },
    string
  >([
    [({ f }) => f === 'pictureID', ({ v }) => v.match(/id=(.*)/)[1]],
    [({ f }) => f === 'fullName', ({ v }) => _.startCase(v)],
    [() => true, ({ v }) => v],
  ]);

  static parser = new ParsebleCSV(
    CardFormV2Raw,
    (_header, index) => CardFormV2Raw.headerTransformer(index),
    (v, f) => CardFormV2Raw.transformer({ v, f }),
  );
}
