import { NgModule } from '@angular/core';
import { CoachBaseProfileDisplayerComponent } from './components/coach-base-profile-displayer/coach-base-profile-displayer.component';
import { CoachBaseProfileFormModule } from '../../../../../coach-base-profile-form/coach-base-profile-form.module';
import { CoachBaseProfileFormDialogComponent } from './components/coach-base-profile-form-dialog/coach-base-profile-form-dialog.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { SharedPipesModule } from '../../../../../../../../shared/pipes/shared-pipes.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    CoachBaseProfileDisplayerComponent,
    CoachBaseProfileFormDialogComponent
  ],
  exports: [
    CoachBaseProfileDisplayerComponent,
  ],
  imports: [
    CommonModule,
    CoachBaseProfileFormModule,

    SharedPipesModule,

    MatButtonModule,
    MatDividerModule,
    MatDialogModule,
    MatIconModule
  ],
  entryComponents: [
    CoachBaseProfileFormDialogComponent
  ]
})
export class CoachBaseProfileDisplayerModule { }
