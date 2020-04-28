import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'ch-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormContainerComponent implements OnInit {

  @Input() title: string;
  @Input() description: string;
  @Input() maxWidth = 350;

  constructor() { }

  ngOnInit(): void {
    console.log(this.maxWidth);
  }

}
