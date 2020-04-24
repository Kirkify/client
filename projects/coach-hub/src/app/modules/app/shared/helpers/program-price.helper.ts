import { ProgramInterface } from '../../models/program.interface';

export function programPriceHelper(program: Readonly<ProgramInterface>): ProgramInterface {
  const rootPrices = program.prices.filter(x => x.sub_options !== null);

  for (const rootPrice of rootPrices) {
    rootPrice.sub_options_values = [];
    for (const subOptionGuid of rootPrice.sub_options) {
      const subOption = program.prices.find(x => x.guid === subOptionGuid);

      if (subOption) {
        rootPrice.sub_options_values.push(subOption);
      }
    }
  }

  return {
    ...program,
    prices: rootPrices
  };
}
