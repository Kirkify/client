import { NgModule } from '@angular/core';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './components/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { SimpleLoaderModule } from '../../shared/modules/simple-loader/simple-loader.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SimpleMessageModule } from '../../shared/modules/simple-message/simple-message.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FooterModule } from '../footer/footer.module';

@NgModule({
  declarations: [ ContactComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextMaskModule,
    ContactRoutingModule,
    MatCardModule,
    SimpleLoaderModule,
    FooterModule,
    MatFormFieldModule,
    SimpleMessageModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatInputModule,
    MatButtonModule
  ],
})
export class ContactModule {
}
