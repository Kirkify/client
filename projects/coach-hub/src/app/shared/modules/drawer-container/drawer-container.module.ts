import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DrawerContainerComponent } from './drawer-container.component';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    DrawerContainerComponent
  ],
  exports: [
    DrawerContainerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatTooltipModule
  ]
})
export class DrawerContainerModule { }
