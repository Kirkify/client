import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UiQuery } from '../../../state/ui/ui.query';
import { Observable } from 'rxjs';
import { NavListItemInterface } from './models/nav-list-item.interface';
import { MatDrawerContent } from '@angular/material/sidenav';
import { UiService } from '../../../state/ui/ui.service';

@Component({
  selector: 'ch-drawer-container',
  templateUrl: './drawer-container.component.html',
  styleUrls: [ './drawer-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerContainerComponent implements OnInit, OnDestroy {

  @ViewChild('drawerContent') drawerContent: MatDrawerContent;

  @Input() navList: NavListItemInterface[] = [];

  isExpanded: boolean;
  toolbarHeight$: Observable<number>;

  constructor(
    private uiQuery: UiQuery,
    private uiService: UiService
  ) {
    this.toolbarHeight$ = this.uiQuery.selectToolbarHeight();
    this.isExpanded = this.uiQuery.getIsScreenWidthMediumOrGreater();
  }

  ngOnInit() {
    this.uiService.updateAppContainerOverflow(true);
  }

  ngOnDestroy(): void {
    this.uiService.updateAppContainerOverflow(false);
  }
}
