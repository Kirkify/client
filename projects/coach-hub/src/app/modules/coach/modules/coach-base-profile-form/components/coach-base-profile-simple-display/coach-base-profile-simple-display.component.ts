import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { CoachBaseProfileInterface } from '../../../../../app/models/coach-base-profile.interface';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UiService } from '../../../../../../state/ui/ui.service';
import { CoachBaseProfileFormDialogComponent } from '../coach-base-profile-form-dialog/coach-base-profile-form-dialog.component';
import { tap } from 'rxjs/operators';
import { CoachQuery } from '../../../../../../state/coach/coach.query';

@Component({
  selector: 'ch-coach-base-profile-simple-display',
  templateUrl: './coach-base-profile-simple-display.component.html',
  styleUrls: ['./coach-base-profile-simple-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoachBaseProfileSimpleDisplayComponent implements OnInit {

  baseProfile$ = this.coachQuery.selectBaseProfile$;

  private _subscriptions = new Subscription();

  constructor(private dialog: MatDialog,
              private uiService: UiService,
              private coachQuery: CoachQuery
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
