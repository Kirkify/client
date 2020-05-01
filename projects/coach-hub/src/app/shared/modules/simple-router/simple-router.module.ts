import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleRouterComponent } from './simple-router.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    SimpleRouterComponent
  ],
  exports: [
    SimpleRouterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SimpleRouterModule {
}
