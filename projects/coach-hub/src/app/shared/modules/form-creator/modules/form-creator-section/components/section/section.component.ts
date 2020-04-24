import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SectionInterface } from '../../../../models/section.interface';
import { QuestionInterface } from '../../../../models/question.interface';
import { FormCreatorService } from '../../../../services/form-creator.service';
import { FormCreatorQuery } from '../../../../state/form-creator.query';
import { tap } from 'rxjs/operators';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ReOrderSectionDialogComponent } from '../re-order-section-dialog/re-order-section-dialog.component';
import { ReOrderDialogInterface } from '../../models/re-order-dialog.interface';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'ch-section',
  templateUrl: './section.component.html',
  styleUrls: [ './section.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionComponent implements OnInit {

  @Input() section: SectionInterface;
  @Input() showHeader: boolean;

  questions$: Observable<QuestionInterface[]>;
  sectionHeader$: Observable<QuestionInterface>;
  sectionsLength$: Observable<number>;

  private _subscriptions = new Subscription();

  constructor(
    private service: FormCreatorService,
    private query: FormCreatorQuery,
    private dialog: MatDialog
  ) {
    this.sectionsLength$ = this.query.selectSectionsLength();
  }

  ngOnInit(): void {
    const sectionId = this.section.id;
    this.questions$ = this.query.selectQuestionsForSection(sectionId);
    this.sectionHeader$ = this.query.selectSectionHeader(sectionId);
  }

  trackByFunc(index, item: QuestionInterface) {
    if (!item) {
      return null;
    }
    return item.id;
  }

  openDialog() {
    const data: ReOrderDialogInterface = {
      query: this.query,
      service: this.service
    };

    const dialogRef = this.dialog.open(ReOrderSectionDialogComponent, { data });

    this._subscriptions.add(
      dialogRef.afterClosed().pipe(
        tap((sections: SectionInterface[]) => {
          this.service.reorderSections(sections);
        })
      ).subscribe()
    );
  }

  setActive(id: string) {
    this.service.updateActive(id);
  }

  drop(event: CdkDragDrop<string>) {
    const sectionId = event.container.data;
    // const questionId = event.item.data;

    this.service.moveQuestionWithinSection(sectionId, event.previousIndex, event.currentIndex);
  }

  submit() {
    this.service.validateQuestions();
  }

}
