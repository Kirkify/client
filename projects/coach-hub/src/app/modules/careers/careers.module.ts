import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareersRoutingModule } from './careers-routing.module';
import { CareersComponent } from './components/careers/careers.component';
import { FooterModule } from '../footer/footer.module';


@NgModule({
  declarations: [CareersComponent],
  imports: [
    CommonModule,
    CareersRoutingModule,

    FooterModule
  ]
})
export class CareersModule { }
