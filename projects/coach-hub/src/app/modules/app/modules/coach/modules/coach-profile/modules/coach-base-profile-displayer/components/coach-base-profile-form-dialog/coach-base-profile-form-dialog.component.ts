import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'ch-coach-base-profile-form-dialog',
  templateUrl: './coach-base-profile-form-dialog.component.html',
  styleUrls: [ './coach-base-profile-form-dialog.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoachBaseProfileFormDialogComponent {
  submitSubject = new Subject();

  constructor(private dialogRef: MatDialogRef<any>) {
  }

  onSubmit() {
    this.submitSubject.next();
  }

  close(updated: boolean) {
    this.dialogRef.close(updated);
  }
}
