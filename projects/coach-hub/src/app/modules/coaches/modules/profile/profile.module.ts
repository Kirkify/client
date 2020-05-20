import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { SimpleRouterModule } from '../../../../shared/modules/simple-router/simple-router.module';
import { ProfileComponent } from './components/profile/profile.component';
import { SimpleLoaderModule } from '../../../../shared/modules/simple-loader/simple-loader.module';
import { SimpleMessageModule } from '../../../../shared/modules/simple-message/simple-message.module';


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,

    SimpleRouterModule,
    SimpleLoaderModule,
    SimpleMessageModule
  ]
})
export class ProfileModule { }
