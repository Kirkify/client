import { Component, OnInit } from '@angular/core';
import { MessagingRoutesEnum } from '../../messaging-routes.enum';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ch-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
  routes = MessagingRoutesEnum;

  searchControl = new FormControl('');

  constructor() { }

  ngOnInit() {
  }

}
