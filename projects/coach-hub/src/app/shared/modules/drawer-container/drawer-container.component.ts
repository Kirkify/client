import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UiQuery } from '../../../state/ui/ui.query';
import { Observable, Subscription } from 'rxjs';
import { NavListItemInterface } from './models/nav-list-item.interface';
import { MatDrawerContent } from '@angular/material/sidenav';
import { UiService } from '../../../state/ui/ui.service';
import { take, tap } from 'rxjs/operators';

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
  toolbarHeight$ = this.uiQuery.selectFullToolbarHeight$;

  private _subscriptions = new Subscription();

  constructor(
    private uiQuery: UiQuery,
  ) {
  }

  ngOnInit() {
    this._subscriptions.add(
      this.uiQuery.selectIsScreenWidthMediumOrGreater$.pipe(
        take(1),
        tap(isGreater => this.isExpanded = isGreater)
      ).subscribe()
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
