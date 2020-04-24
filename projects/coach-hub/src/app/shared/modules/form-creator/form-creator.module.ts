import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCreatorContainerComponent } from './components/form-creator-container/form-creator-container.component';
import { FormCreatorComponent } from './form-creator.component';
import { FormCreatorRoutingModule } from './form-creator-routing.module';
import { FormCreatorSectionModule } from './modules/form-creator-section/form-creator-section.module';
import { QuestionsContainerComponent } from './components/questions-container/questions-container.component';
import { FormEditorModule } from './modules/form-editor/form-editor.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    FormCreatorComponent,
    FormCreatorContainerComponent,
    QuestionsContainerComponent
  ],
  exports: [
    QuestionsContainerComponent
  ],
  imports: [
    CommonModule,
    FormCreatorRoutingModule,
    FormCreatorSectionModule,
    FormEditorModule,

    // FormlyModule.forRoot({
    //   types: [
    //     {
    //       name: 'chQuestion', component: QuestionComponent
    //     }
    //   ],
    //   validationMessages: [
    //     { name: 'required', message: 'This field is required' }
    //   ]
    // }),
    // FormlyMaterialModule,

    MatTabsModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class FormCreatorModule { }
