import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationShellComponent } from './components/navigation-shell/navigation-shell.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';



@NgModule({
  declarations: [
    NavigationShellComponent
  ],
  exports: [
    NavigationShellComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatBadgeModule
  ]
})
export class NavigationShellModule { }
