import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ch-sponsorship',
  templateUrl: './sponsorship.component.html',
  styleUrls: ['./sponsorship.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SponsorshipComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
