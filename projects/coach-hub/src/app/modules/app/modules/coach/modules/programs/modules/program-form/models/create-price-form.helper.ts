import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { guid } from '@datorama/akita';
import { CreateProgramPriceInterface } from '../../../../../../../models/create-program-price.interface';
import { ProgramPriceInterface } from '../../../../../../../models/program-price.interface';


export function createPriceFormGroup(fb: FormBuilder, value: ProgramPriceInterface = null) {

  const defaultValue: CreateProgramPriceInterface = {
    guid: guid(),
    name: '',
    price: 0,
    capacity: 10,
    has_wait_list: false,
    sub_options_preset: 0,
    multi_sub_options_required: 2
  } as any;

  const newValue: any = value === null ? defaultValue : value;

  const obj = {
    guid: newValue.guid,
    name: newValue.name,
    price: newValue.price,
    capacity: newValue.capacity,
    has_wait_list: newValue.has_wait_list,
    sub_options_preset: newValue.sub_options_preset,
    sub_options: newValue.sub_options,
    sub_options_values_form: fb.array([]) as any,
    multi_sub_options_required: newValue.multi_sub_options_required
  } as any;

  if (newValue.hasOwnProperty('id')) {
    obj.id = newValue.id;
  }

  if (newValue.hasOwnProperty('sub_options_values')) {
    const subOptions: FormGroup[] = [];

    for (const subOption of newValue.sub_options_values) {
      subOptions.push(createPriceFormGroup(fb, subOption));
    }
  }

  return fb.group(obj);
}

export function createPriceFormArray(fb: FormBuilder, values: ProgramPriceInterface[]) {

  const prices: FormGroup[] = [];

  for (const value of values) {
    const obj = fb.group({
      id: value.id,
      guid: value.guid,
      name: value.name,
      price: value.price,
      capacity: value.capacity,
      has_wait_list: value.has_wait_list,
      sub_options_preset: value.sub_options_preset,
      multi_sub_options_required: value.multi_sub_options_required,
    });

    if (value.hasOwnProperty('sub_options_values')) {
      const subOptions: FormGroup[] = [];
      for (const subOption of value.sub_options_values) {
        subOptions.push(createPriceFormGroup(fb, subOption));
      }
      obj.addControl('sub_options_values_form', fb.array(subOptions));
    }

    prices.push(obj);
  }

  return fb.array(prices);
}
