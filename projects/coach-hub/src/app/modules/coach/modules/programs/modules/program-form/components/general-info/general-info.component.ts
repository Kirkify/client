import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UiQuery } from '../../../../../../../../state/ui/ui.query';
import { CoachQuery } from '../../../../../../state/coach.query';
import { SportInterface } from '../../../../../../../app/models/sport.interface';
import { AbstractControl, FormGroup } from '@angular/forms';
import { TagInterface } from '../../../../../tags/models/tag.interface';
import { AddSpecificProgramTimesDialogComponent } from '../add-specific-program-times-dialog/add-specific-program-times-dialog.component';
import { tap } from 'rxjs/operators';
import { TagTypeEnum } from '../../../../../../../../components/confirm-dialog/models/tag-type.enum';
import { DialogService } from '../../../../../../../../services/dialog/dialog.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'ch-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: [ './general-info.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneralInfoComponent implements OnInit, OnDestroy {

  @Input() formGroup: FormGroup;
  @Input() preSelectedTags: number[] = [];
  @Input() isFormDisabled: boolean;

  updatedSelectedTags: number[] = [];
  categories: Observable<SportInterface[]>;
  isScreenMobile: Observable<boolean>;
  locationControl: AbstractControl;

  private _subscriptions = new Subscription();

  constructor(
    private coachQuery: CoachQuery,
    private uiQuery: UiQuery,
    private dialog: MatDialog,
    private dialogService: DialogService
  ) {
    this.isScreenMobile = this.uiQuery.selectIsScreenWidthSmall();
    this.categories = this.coachQuery.selectApprovedSports();
  }

  ngOnInit() {
    this.locationControl = this.formGroup.get('location_id');
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  onTagsUpdated($event: TagInterface[]) {
    this.updatedSelectedTags = $event.map(x => x.id);
  }

  openMoreCategoryDialog() {
    const msg1 = `
      In order to add more categories you must first apply as a Coach in one of our predefined categories.
      After you are approved you will see the new category in the list.
    `;

    const msg2 = `
      Once approved as a Coach in a specific category, you will also be featured on our Coach Marketing
      Platform which will drive further traffic to your programs.
    `;

    this.dialogService.customConfirmation({
      confirmText: 'Apply To Coach',
      message: [
        {
          tagType: TagTypeEnum.Paragraph,
          tagValue: msg1
        },
        {
          tagType: TagTypeEnum.H3,
          tagValue: 'Why should you apply to Coach in a specific category?'
        },
        {
          tagType: TagTypeEnum.Paragraph,
          tagValue: msg2
        }
      ]
    }).pipe(
      tap(result => {
        if (result) {
          console.log('Route to Profile Page');
        }
      })
    ).subscribe();
  }

  openSpecificTimesDialog() {
    const dialogRef = this.dialog.open(AddSpecificProgramTimesDialogComponent);

    this._subscriptions.add(
      dialogRef.afterClosed().pipe(
        tap(result => console.log(`Dialog result: ${ result }`))
      ).subscribe()
    );
  }

  updateNow() {
    console.log('Updating');
  }
}
