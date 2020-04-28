import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ProgramPriceInterface } from '../../../../../../../app/models/program-price.interface';
import { ProgramPriceSubOptionsPresetEnum } from '../../../../../../../app/models/program-price-sub-options-preset.enum';

@Component({
  selector: 'ch-price-displayer',
  templateUrl: './price-displayer.component.html',
  styleUrls: [ './price-displayer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PriceDisplayerComponent implements OnInit {

  @Input() prices: ProgramPriceInterface[];

  constructor() { }

  ngOnInit() {
  }

  getStartingAtPrice() {
    let startingPrice: number;

    const calculatePrice = (newPrice: number) => {
      if (startingPrice) {
        if (newPrice < startingPrice) {
          startingPrice = newPrice;
        }
      } else {
        startingPrice = newPrice;
      }
    };

    for (const price of this.prices) {

      if (price.sub_options_preset !== 0) {

        if (price.sub_options_preset === ProgramPriceSubOptionsPresetEnum.OneRequired) {
          const cheapestSubOption = price.sub_options_values.reduce(
            (acc, loc) =>
              acc.price < loc.price
              ? acc
              : loc
          );

          calculatePrice(price.price + cheapestSubOption.price);
        }
      } else {
        calculatePrice(price.price);
      }
    }
    return startingPrice;
  }

}
