import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ProgramPriceInterface } from '../../../../models/program-price.interface';
import { ProgramPriceSubOptionsPresetEnum } from '../../../../models/program-price-sub-options-preset.enum';
import { MatSelectionListChange } from '@angular/material/typings/list';
import { MatCheckbox, MatCheckboxChange, MatSelectionList } from '@angular/material';

@Component({
  selector: 'ch-program-price-selector',
  templateUrl: './program-price-selector.component.html',
  styleUrls: ['./program-price-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgramPriceSelectorComponent implements OnInit {

  @Input() prices: ProgramPriceInterface[];

  constructor() { }

  ngOnInit() {

  }

  rootSelectionUpdated(ev: MatCheckboxChange, selectionList: MatSelectionList) {
    if (! ev.checked) {
      selectionList.deselectAll();
    }
  }

  subSelectionUpdated(ev: MatSelectionListChange, rootCheckbox: MatCheckbox) {
    if (ev.source.selectedOptions.hasValue()) {
      rootCheckbox.checked = true;
    }
  }

  isSubOptionRequired(price: ProgramPriceInterface): boolean {
    return price.sub_options_preset === ProgramPriceSubOptionsPresetEnum.OneRequired ||
           price.sub_options_preset === ProgramPriceSubOptionsPresetEnum.MultiRequired;
  }

  getRequiredSubOptions(price: ProgramPriceInterface) {
    if (price.sub_options_preset === ProgramPriceSubOptionsPresetEnum.OneRequired) {
      return 'One sub option is required';
    } else if (price.sub_options_preset === ProgramPriceSubOptionsPresetEnum.MultiRequired) {
      return `$${price.multi_sub_options_required} sub options are required`;
    }
  }

  register() {
    console.log('Register');
  }
}
