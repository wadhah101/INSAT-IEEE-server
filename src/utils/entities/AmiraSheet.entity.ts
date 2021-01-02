import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import _, { CondPair } from 'lodash';
import Papa from 'papaparse';

export class AmiraSheetElement {
  static parse(e: Record<string, any>): AmiraSheetElement {
    const t = plainToClass(AmiraSheetElement, e, {
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

  static fromCSV(data: string): AmiraSheetElement[] {
    const mapFunctionGen = (
      indexIn: number,
      name: string,
    ): CondPair<number, string> => [(e) => e === indexIn, () => name];
    const mapFunction = _.cond<number, string>([
      mapFunctionGen(3, 'ieeeID'),
      [() => true, () => ''],
    ]);
    const t = Papa.parse(data.trim(), {
      header: true,
      transformHeader: (_, index) => mapFunction(index),
    });

    return t.data.map((e) => AmiraSheetElement.parse(e));
  }
}
