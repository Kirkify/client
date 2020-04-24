import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageCreatorComponent } from './components/message-creator/message-creator.component';
import { AutocompleteChipsModule } from '../../../../shared/modules/autocomplete-chips/autocomplete-chips.module';
import { SimpleLoaderModule } from '../../../../shared/modules/simple-loader/simple-loader.module';
import { SimpleMessageModule } from '../../../../shared/modules/simple-message/simple-message.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MessageCreatorComponent,
  ],
  exports: [
    MessageCreatorComponent
  ],
  imports: [
    CommonModule,

    ReactiveFormsModule,
    AutocompleteChipsModule,
    SimpleLoaderModule,
    SimpleMessageModule,

    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatTooltipModule,
    MatMenuModule
  ]
})
export class MessageCreatorModule { }
