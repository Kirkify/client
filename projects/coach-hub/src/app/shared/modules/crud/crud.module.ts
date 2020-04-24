import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudMenuComponent } from './components/crud-menu/crud-menu.component';
import { RouterModule } from '@angular/router';
import { CrudMainComponent } from './components/crud-main/crud-main.component';
import { SimpleLoaderModule } from '../simple-loader/simple-loader.module';
import { CrudEditComponent } from './components/crud-edit/crud-edit.component';
import { SimpleMessageModule } from '../simple-message/simple-message.module';
import { CrudCreateComponent } from './components/crud-create/crud-create.component';
import { CrudViewComponent } from './components/crud-view/crud-view.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    CrudMenuComponent,
    CrudMainComponent,
    CrudEditComponent,
    CrudCreateComponent,
    CrudViewComponent,
  ],
  exports: [
    CrudMenuComponent,
    CrudMainComponent,
    CrudEditComponent,
    CrudCreateComponent,
    CrudViewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SimpleLoaderModule,
    SimpleMessageModule,
    MatButtonModule
  ]
})
export class CrudModule {
}
