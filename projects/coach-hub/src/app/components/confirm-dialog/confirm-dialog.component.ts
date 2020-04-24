import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ConfirmDialogDataInterface } from './models/confirm-dialog-data.interface';
import { TagInterface } from './models/tag.interface';
import { TagTypeEnum } from './models/tag-type.enum';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ch-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: [ './confirm-dialog.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDialogComponent {
  title = environment.app_name;
  confirmText = 'Yes';
  tags: TagInterface[] = [];
  tagTypes = TagTypeEnum;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogDataInterface) {
    if (data.title) {
      this.title = data.title;
    }
    if (data.confirmText) {
      this.confirmText = data.confirmText;
    }

    this.tags = data.message;
  }
}
