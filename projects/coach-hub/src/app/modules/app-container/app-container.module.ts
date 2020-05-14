import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { NavListComponent } from './components/nav-list/nav-list.component';
import { AppContainerComponent } from './components/app-container/app-container.component';
import { ToolbarContentComponent } from './components/toolbar-content/toolbar-content.component';
import { NavListItemComponent } from './components/nav-list-item/nav-list-item.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    NavListComponent,
    AppContainerComponent,
    ToolbarContentComponent,
    NavListItemComponent
  ],
  exports: [
    AppContainerComponent
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
    MatBadgeModule,
    MatProgressBarModule,
    MatTooltipModule
  ]
})
export class AppContainerModule {
}
