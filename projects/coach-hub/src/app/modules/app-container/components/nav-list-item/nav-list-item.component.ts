import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'ch-nav-list-item',
  templateUrl: './nav-list-item.component.html',
  styleUrls: ['./nav-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavListItemComponent implements OnInit {

  @Input() route: string;
  @Input() name: string;
  @Input() icon: string;

  constructor() { }

  ngOnInit(): void {
  }

}
