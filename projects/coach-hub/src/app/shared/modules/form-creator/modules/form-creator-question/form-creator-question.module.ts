import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './components/question/question.component';
import { ParagraphComponent } from './components/paragraph/paragraph.component';
import { ShortAnswerComponent } from './components/short-answer/short-answer.component';
import { MoreOptionsComponent } from './components/more-options/more-options.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultipleChoiceComponent } from './components/multiple-choice/multiple-choice.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    QuestionComponent,
    ParagraphComponent,
    ShortAnswerComponent,
    MoreOptionsComponent,
    MultipleChoiceComponent
  ],
  exports: [
    QuestionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDividerModule
  ]
})
export class FormCreatorQuestionModule { }
