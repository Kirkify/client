import { ProgramPriceSubOptionsPresetEnum } from './program-price-sub-options-preset.enum';
import { ProgramPriceInterface } from './program-price.interface';

export interface CreateProgramPriceInterface {
  guid: string;
  name: string;
  price: number;
  capacity: number;
  has_wait_list: boolean;
  sub_options: string[];
  sub_options_values?: ProgramPriceInterface[];
  sub_options_preset: ProgramPriceSubOptionsPresetEnum;
  multi_sub_options_required: number;
}
