import { plainToClass } from 'class-transformer';
import { IsInt, IsEmail, validateSync, IsNotEmpty } from 'class-validator';
import _, { CondPair } from 'lodash';
import Papa from 'papaparse';

export class IEEEAnlyticsElement {
  @IsInt()
  ieeeID: number;

  @IsInt()
  year: number;

  @IsEmail()
  email: string;

  static parse(e: Record<string, any>): IEEEAnlyticsElement {
    const t = plainToClass(IEEEAnlyticsElement, e, {
      enableImplicitConversion: true,
    });

    const errors = validateSync(t, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      console.log(e);
      throw new Error(errors.toString());
    }

    return t;
  }

  static fromCSV(data: string): IEEEAnlyticsElement[] {
    const mapFunctionGen = (
      indexIn: number,
      name: string,
    ): CondPair<number, string> => [(e) => e === indexIn, () => name];
    const mapFunction = _.cond<number, string>([
      mapFunctionGen(3, 'ieeeID'),
      mapFunctionGen(14, 'year'),
      mapFunctionGen(9, 'email'),
      [() => true, () => ''],
    ]);
    const t = Papa.parse(data.trim(), {
      header: true,
      transformHeader: (_, index) => mapFunction(index),
    });

    return t.data.map((e) => IEEEAnlyticsElement.parse(e));
  }
}
