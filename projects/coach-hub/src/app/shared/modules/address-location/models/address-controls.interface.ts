import { AbstractControl } from '@angular/forms';

export interface AddressControlsInterface {
  streetNumber: AbstractControl;
  streetName: AbstractControl;
  apartmentNumber: AbstractControl;
  city: AbstractControl;
  province: AbstractControl;
  postalCode: AbstractControl;
}
