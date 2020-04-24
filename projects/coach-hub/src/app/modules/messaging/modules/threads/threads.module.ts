import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreadListComponent } from './components/thread-list/thread-list.component';
import { SimpleLoaderModule } from '../../../../shared/modules/simple-loader/simple-loader.module';
import { SimpleMessageModule } from '../../../../shared/modules/simple-message/simple-message.module';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SharedPipesModule } from '../../../../shared/pipes/shared-pipes.module';
import { MatButtonModule } from '@angular/material/button';



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
    SharedPipesModule,

    MatListModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class ThreadsModule { }
