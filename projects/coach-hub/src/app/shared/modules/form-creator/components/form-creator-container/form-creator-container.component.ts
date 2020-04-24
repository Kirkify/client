import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { FormInterface } from '../../models/form.interface';
import { FormCreatorService } from '../../services/form-creator.service';
import { FormHttpService } from '../../services/form-http.service';

@Component({
  selector: 'ch-form-creator-container',
  templateUrl: './form-creator-container.component.html',
  styleUrls: ['./form-creator-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormCreatorContainerComponent implements AfterViewInit {
  form = new BehaviorSubject<FormInterface>(null);

  constructor(
    private route: ActivatedRoute,
    private service: FormHttpService
  ) {}

  ngAfterViewInit(): void {
    this.route.params.pipe(
      map(params => {
        return params.uuid;
      }),
      switchMap(id => {
        return this.service.getForm(id).pipe(
          tap(form => {
            this.form.next(form);
          })
        );
      })
    ).subscribe();
  }

}
