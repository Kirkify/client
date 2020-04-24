import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { SectionInterface } from '../../../../models/section.interface';
import { ReOrderDialogInterface } from '../../models/re-order-dialog.interface';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { take, tap } from 'rxjs/operators';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ch-re-order-section-dialog',
  templateUrl: './re-order-section-dialog.component.html',
  styleUrls: ['./re-order-section-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReOrderSectionDialogComponent implements OnInit {

  sections: SectionInterface[];

  constructor(@Inject(MAT_DIALOG_DATA) private data: ReOrderDialogInterface) { }

  ngOnInit() {
    this.data.query.selectSections().pipe(
      take(1),
      tap(sections => this.sections = JSON.parse(JSON.stringify(sections)))
    ).subscribe();
  }

  moveUp(index: number) {
    moveItemInArray(this.sections, index, index - 1);
  }

  moveDown(index: number) {
    moveItemInArray(this.sections, index, index + 1);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.sections, event.previousIndex, event.currentIndex);
  }

}
