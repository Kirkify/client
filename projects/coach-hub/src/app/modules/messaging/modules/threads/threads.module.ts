import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreadListComponent } from './components/thread-list/thread-list.component';
import { SimpleLoaderModule } from '../../../../shared/modules/simple-loader/simple-loader.module';
import { SimpleMessageModule } from '../../../../shared/modules/simple-message/simple-message.module';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TimeFromNowModule } from '../../../../shared/pipes/time-from-now/time-from-now.module';


@NgModule({
  declarations: [
    ThreadListComponent
  ],
  exports: [
    ThreadListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

    SimpleLoaderModule,
    SimpleMessageModule,
    TimeFromNowModule,

    MatListModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class ThreadsModule {
}
