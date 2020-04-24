import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ch-form-field-spinner',
  templateUrl: './form-field-spinner.component.html',
  styleUrls: [ './form-field-spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldSpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
