import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'ch-location-dialog',
  templateUrl: './location-dialog.component.html',
  styleUrls: [ './location-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationDialogComponent {
  submitSubject = new Subject();

  constructor(private dialogRef: MatDialogRef<any>) {
  }

  onSubmit() {
    this.submitSubject.next();
  }

  close(id: number) {
    this.dialogRef.close(id);
  }
}
