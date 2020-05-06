import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { UiService } from '../../../../state/ui/ui.service';

@Component({
  selector: 'ch-nav-list-item',
  templateUrl: './nav-list-item.component.html',
  styleUrls: ['./nav-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class NavListItemComponent implements OnInit {

  @Input() route: string;
  @Input() name: string;
  @Input() icon: string;

  constructor(
    private uiService: UiService
  ) { }

  ngOnInit(): void {
  }

  closeDrawer() {
    this.uiService.closeSideNav();
  }
}
