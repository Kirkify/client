import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { VerySimpleLoaderClass } from '../../../../../../../../../../shared/modules/simple-loader/models/very-simple-loader.class';
import { ProgramsService } from '../../../../services/programs.service';
import { FormHttpService } from '../../../../../../../../../../shared/modules/form-creator/services/form-http.service';
import { FormInterface } from '../../../../../../../../../../shared/modules/form-creator/models/form.interface';

@Component({
  selector: 'ch-questions-generator',
  templateUrl: './questions-generator.component.html',
  styleUrls: [ './questions-generator.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionsGeneratorComponent implements OnInit, OnDestroy {

  @Input() programId: string;
  @Input() form: FormInterface;
  loader = new VerySimpleLoaderClass();

  private _subscriptions = new Subscription();

  constructor(
    private formService: FormHttpService,
    private programsService: ProgramsService
  ) {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  generateForm() {
    this.loader.setLoadingStatus(true);

    this._subscriptions.add(
      this.formService.createNewForm().pipe(
        finalize(() => this.loader.setLoadingStatus(false)),
        tap(form => {
          this.form = form;
        }),
        switchMap(form => {
          return this.programsService.addForm(this.programId, form.id);
        })
      ).subscribe()
    );
  }
}
