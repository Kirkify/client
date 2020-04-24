import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LocationFormComponent } from './location-form.component';
import { SimpleLoaderModule } from '../../../../../../../../shared/modules/simple-loader/simple-loader.module';
import { SimpleMessageModule } from '../../../../../../../../shared/modules/simple-message/simple-message.module';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    LocationFormComponent
  ],
  exports: [
    LocationFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SimpleLoaderModule,
    SimpleMessageModule,

    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class LocationFormModule {
}
