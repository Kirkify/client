import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogDataInterface } from '../../components/confirm-dialog/models/confirm-dialog-data.interface';
import { TagTypeEnum } from '../../components/confirm-dialog/models/tag-type.enum';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {
  }

  unsavedChangesConfirmation(): Observable<boolean> {
    // Unsaved changes, confirm data loss before navigating
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: [
          {
            tagType: TagTypeEnum.H3,
            tagValue: 'You have unsaved changes!'
          },
          {
            tagType: TagTypeEnum.Paragraph,
            tagValue: 'Are you sure you want to leave this page without saving your changes?'
          }
        ]
      } as ConfirmDialogDataInterface
    });
    return dialogRef.afterClosed().pipe(
      map(result => result === true)
    );
  }

  deleteConfirmation(name: string): Observable<boolean> {
    const msg = `Are you sure you want to delete "${ name }"?`;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: [
          {
            tagType: TagTypeEnum.Paragraph,
            tagValue: msg
          }
        ]
      } as ConfirmDialogDataInterface
    });
    return dialogRef.afterClosed().pipe(
      map(result => result === true)
    );
  }

  customConfirmation(data: ConfirmDialogDataInterface): Observable<boolean> {
    // Unsaved changes, confirm data loss before navigating
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data });
    return dialogRef.afterClosed().pipe(
      map(result => result === true)
    );
  }

  confirm(message: string) {
    return new Promise<boolean>(resolve => {
      return resolve(window.confirm(message));
    });
  }
}
