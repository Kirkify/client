import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ch-investors',
  templateUrl: './investors.component.html',
  styleUrls: ['./investors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestorsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
