import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from './components/section/section.component';
import { FormCreatorQuestionModule } from '../form-creator-question/form-creator-question.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReOrderSectionDialogComponent } from './components/re-order-section-dialog/re-order-section-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    SectionComponent,
    ReOrderSectionDialogComponent
  ],
  exports: [
    SectionComponent
  ],
  entryComponents: [
    ReOrderSectionDialogComponent
  ],
  imports: [
    CommonModule,
    FormCreatorQuestionModule,

    MatMenuModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    DragDropModule
  ]
})
export class FormCreatorSectionModule {
}
