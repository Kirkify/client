import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'ch-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CareersComponent implements OnInit {
  assetsUrl = environment.assets_url;
  appName = environment.app_name;

  constructor() { }

  ngOnInit(): void {
  }

}
