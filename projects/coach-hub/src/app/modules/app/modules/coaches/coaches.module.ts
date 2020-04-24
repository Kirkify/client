import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoachesRoutingModule } from './coaches-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { RootComponent } from './root.component';
import { ProgramsComponent } from './components/programs/programs.component';
import { SimpleLoaderModule } from '../../../../shared/modules/simple-loader/simple-loader.module';
import { SimpleMessageModule } from '../../../../shared/modules/simple-message/simple-message.module';

@NgModule({
  declarations: [
    RootComponent,
    ProfileComponent,
    ProgramsComponent
  ],
  imports: [
    CommonModule,
    CoachesRoutingModule,
    SimpleLoaderModule,
    SimpleMessageModule
  ]
})
export class CoachesModule { }
