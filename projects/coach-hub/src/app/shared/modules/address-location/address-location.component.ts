import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { AddressControlsInterface } from './models/address-controls.interface';

@Component({
  selector: 'ch-address-location',
  templateUrl: './address-location.component.html',
  styleUrls: [ './address-location.component.scss'],
  // This needs to be set as Default as it needs to listen for parent re-renders
  changeDetection: ChangeDetectionStrategy.Default
})
export class AddressLocationComponent implements OnInit {
  @Input() formControls: AddressControlsInterface;

  constructor() { }

  ngOnInit() {
  }

}
