import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { SimpleLoaderModule } from '../../../../../../../../shared/modules/simple-loader/simple-loader.module';
import { SimpleMessageModule } from '../../../../../../../../shared/modules/simple-message/simple-message.module';
import { LocationSelectorComponent } from './components/location-selector/location-selector.component';
import { FormFieldSpinnerModule } from '../../../../../../../../shared/modules/form-field-spinner/form-field-spinner.module';
import { LocationDialogComponent } from './components/location-dialog/location-dialog.component';
import { LocationFormModule } from '../location-form/location-form.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    LocationSelectorComponent,
    LocationDialogComponent
  ],
  exports: [
    LocationSelectorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SimpleLoaderModule,
    SimpleMessageModule,
    FormFieldSpinnerModule,
    LocationFormModule,

    MatDialogModule,
    MatTooltipModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ],
  entryComponents: [
    LocationDialogComponent
  ]
})
export class LocationSelectorModule {
}
