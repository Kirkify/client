import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { CoachBaseProfileInterface } from '../../../../../../../../models/coach-base-profile.interface';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { CoachBaseProfileFormDialogComponent } from '../coach-base-profile-form-dialog/coach-base-profile-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UiService } from '../../../../../../../../../../state/ui/ui.service';

@Component({
  selector: 'ch-coach-base-profile-displayer',
  templateUrl: './coach-base-profile-displayer.component.html',
  styleUrls: [ './coach-base-profile-displayer.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoachBaseProfileDisplayerComponent implements OnInit {
  @Input() profile: CoachBaseProfileInterface;

  private _subscriptions = new Subscription();

  constructor(private dialog: MatDialog,
              private uiService: UiService
  ) {
  }

  ngOnInit() {
  }

  openDialog() {
    this._subscriptions.add(
      this.dialog.open(CoachBaseProfileFormDialogComponent).afterClosed().pipe(
        tap((updated: boolean) => {
          if (updated) {
            this.uiService.showSnackbar('Your coach profile has been successfully updated');
          }
        })
      ).subscribe()
    );
  }
}
