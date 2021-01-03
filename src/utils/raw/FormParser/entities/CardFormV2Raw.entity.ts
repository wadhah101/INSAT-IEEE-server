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

  static parse(e: Record<string, any>): CardFormV2Raw {
    const t = plainToClass(CardFormV2Raw, e, {
      enableImplicitConversion: true,
    });

    const errors = validateSync(t, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }

    return t;
  }

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

  static fromCSV(data: string): CardFormV2Raw[] {
    const t = Papa.parse(data.trim(), {
      header: true,
      transformHeader: (_l, index) => CardFormV2Raw.headerTransformer(index),
      transform: (v, f) => this.transformer({ v, f }),
    });

    return t.data.map((e) => CardFormV2Raw.parse(e));
  }
}
