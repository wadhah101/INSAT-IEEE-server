import { ParserCSV } from './../../../entities/parseble.abstract';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import _ from 'lodash';

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
      [0, 'fullName'],
      [2, 'personalEmail'],
      [3, 'phoneNumber'],
      [4, 'ieeeID'],
      [6, 'pictureID'],
      [7, 'phoneNumber'],
    ].map((e) => [(ind) => ind === e[0], () => e[1]]) as any),

    // else
    [() => true, (e) => e],
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

  static parser = new ParserCSV(
    CardFormV2Raw,
    (_header, index) => CardFormV2Raw.headerTransformer(index),
    (value, field) => CardFormV2Raw.transformer({ v: value, f: field }),
  );
}
