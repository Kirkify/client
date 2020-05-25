import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SimpleMessageModule } from '../../../../shared/modules/simple-message/simple-message.module';
import { SimpleLoaderModule } from '../../../../shared/modules/simple-loader/simple-loader.module';
import { CoachBaseProfileFormComponent } from './components/coach-base-profile-form/coach-base-profile-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { FileUploaderModule } from '../../../../shared/modules/file-uploader/file-uploader.module';
import { CoachBaseProfileSimpleDisplayComponent } from './components/coach-base-profile-simple-display/coach-base-profile-simple-display.component';
import { CoachBaseProfileFormDialogComponent } from './components/coach-base-profile-form-dialog/coach-base-profile-form-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { GenderDisplayModule } from '../../../../shared/pipes/gender-display/gender-display.module';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    CoachBaseProfileFormComponent,
    CoachBaseProfileSimpleDisplayComponent,
    CoachBaseProfileFormDialogComponent
  ],
  exports: [
    CoachBaseProfileFormComponent,
    CoachBaseProfileSimpleDisplayComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SimpleMessageModule,
    SimpleLoaderModule,
    FileUploaderModule,
    GenderDisplayModule,
    // Material Modules
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
    MatDialogModule,
    MatDividerModule,
    MatTooltipModule
  ],
  entryComponents: [
    CoachBaseProfileFormDialogComponent
  ]
})
export class CoachBaseProfileFormModule {
}
