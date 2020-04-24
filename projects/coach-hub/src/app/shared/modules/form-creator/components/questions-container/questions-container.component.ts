import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SectionInterface } from '../../models/section.interface';
import { FormCreatorService } from '../../services/form-creator.service';
import { FormCreatorQuery } from '../../state/form-creator.query';
import { FormCreatorStore } from '../../state/form-creator.store';
import ResizeObserver from 'resize-observer-polyfill';
import { FormInterface } from '../../models/form.interface';
import { FormHttpService } from '../../services/form-http.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'ch-questions-container',
  templateUrl: './questions-container.component.html',
  styleUrls: [ './questions-container.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ FormCreatorService, FormCreatorStore, FormCreatorQuery ]
})
export class QuestionsContainerComponent implements AfterViewInit, OnDestroy {

  @Input('form')
  set form(form: FormInterface) {
    if (form) {
      this.formSubject.next(form);
      this.service.instantiateForm(form);
    }
  }

  /**
   * The max-width that this component is allowed to grow until
   */
  @Input() maxWidth = 770;

  /**
   * Reference to the outer container (div) of this component
   * We use this div to track width and height changes
   */
  @ViewChild('outerContainer') outerContainer: ElementRef<HTMLDivElement>;

  sections$: Observable<SectionInterface[]>;
  outerContainerWidth$: Observable<number>;
  formSubject = new BehaviorSubject<FormInterface>(null);

  private _outerContainerWidthSubject = new BehaviorSubject<number>(0);
  private _outerContainerResizeObserver: ResizeObserver;

  constructor(
    private service: FormCreatorService,
    private httpService: FormHttpService,
    private query: FormCreatorQuery
  ) {
    this.sections$ = this.query.selectSections();
    this.outerContainerWidth$ = this._outerContainerWidthSubject.asObservable();
  }

  trackByFunc(index, item: SectionInterface) {
    if (!item) {
      return null;
    }
    return item.id;
  }

  ngAfterViewInit(): void {
    this._outerContainerResizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        this._outerContainerWidthSubject.next(entry.contentRect.width);
      });
    });

    this._outerContainerResizeObserver.observe(this.outerContainer.nativeElement);
  }

  ngOnDestroy(): void {
    if (this._outerContainerResizeObserver) {
      this._outerContainerResizeObserver.disconnect();
    }
    console.log('Destroying 1');
    // this.service.updateForm();
  }

  submit() {
    this.service.validateQuestions();
  }

  private _fetchForm(id: string) {
    this.httpService.getForm(id).pipe(
      tap(form => {
        this.formSubject.next(form);
        this.service.instantiateForm(form);
      })
    ).subscribe();
  }
}
