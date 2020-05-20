import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SimpleMessageModule } from '../../../../shared/modules/simple-message/simple-message.module';
import { SimpleLoaderModule } from '../../../../shared/modules/simple-loader/simple-loader.module';
import { CoachBaseProfileFormComponent } from './coach-base-profile-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { FileUploaderModule } from '../../../../shared/modules/file-uploader/file-uploader.module';

@NgModule({
  declarations: [
    CoachBaseProfileFormComponent
  ],
  exports: [
    CoachBaseProfileFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SimpleMessageModule,
    SimpleLoaderModule,
    FileUploaderModule,

    // Material Modules
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule
  ]
})
export class CoachBaseProfileFormModule {
}
