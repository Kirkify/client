import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription, throwError } from 'rxjs';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { ProgramsService } from '../../services/programs.service';
import { CreateProgramInterface } from '../../models/create-program.interface';
import { ProgramInterface } from '../../../../../app/models/program.interface';
import { CrudFormClass } from '../../../../../../shared/modules/crud/models/crud-form.class';
import { CrudFormInterface } from '../../../../../../shared/modules/crud/models/crud-form.interface';
import { VerySimpleLoaderClass } from '../../../../../../shared/modules/simple-loader/models/very-simple-loader.class';
import { SimpleMessageType } from '../../../../../../shared/modules/simple-message/models/simple-message.type';
import * as moment from 'moment';
import { serverDate } from '../../../../../../shared/helpers/server-date.helper';
import { TagInterface } from '../../../tags/models/tag.interface';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CoachRoutesEnum } from '../../../../coach-routes.enum';
import { CrudRoutesEnum } from '../../../../../../shared/modules/crud/crud-routes.enum';
import { QueryParamsEnum } from '../../../shared/models/query-params.enum';
import { ProgramPriceInterface } from '../../../../../app/models/program-price.interface';
import { catchError, distinctUntilChanged, finalize, map, tap } from 'rxjs/operators';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { FormInterface } from '../../../../../../shared/modules/form-creator/models/form.interface';
import { AkitaNgFormsManager } from '@datorama/akita-ng-forms-manager';
import { ProgramFormStateInterface } from './models/program-form-state.interface';

@Component({
  selector: 'ch-program-form',
  templateUrl: './program-form.component.html',
  styleUrls: [ './program-form.component.scss' ],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ProgramFormComponent extends CrudFormClass implements CrudFormInterface, AfterViewInit, OnInit, OnDestroy {

  @Input('createNew')
  set createNew(createNew: boolean) {
    if (createNew) {
      this.loader.setLoadingStatus(true);
      this._subscriptions.add(
        this.service.create(null).pipe(
          tap(program => {
            this.router.navigate([ program.id, CrudRoutesEnum.Edit ], {
              relativeTo: this.route.parent,
              replaceUrl: true
            });

            // this.router.navigate()
            // this.setItem(program);
          }),
          finalize(() => this.loader.setLoadingStatus(false))
        ).subscribe()
      );
    }
  }

  @Input('disabled')
  set disabled(disabled: boolean) {
    this._disabled = disabled;
    if (disabled) {
      this.formGroup.disable();
      this.isFormDisabled = true;
      this.hideSubmit = true;
    }
  }

  get disabled() {
    return this._disabled;
  }

  /**
   * When a programId is set it will try and fetch that specific program
   */
  @Input('programId')
  set programId(id: string) {
    this._programId = id;
    this.loader.setLoadingStatus(true);
    this._subscriptions.add(
      this.service.select(id).pipe(
        catchError(err => {
          // this.errMsg.next(err);
          return throwError(err);
        }),
        tap(program => {
          this.setItem(program);
        }),
        finalize(() => this.loader.setLoadingStatus(false))
      ).subscribe()
    );
  }

  get programId() {
    return this._programId;
  }

  @Input() hideSubmit = false;
  @Input() submitEvent: Observable<void>;
  @Output() completed = new EventEmitter<number>();
  @ViewChild('formRef') formRef: FormGroupDirective;
  @ViewChild('matTabGroup') matTabGroup: MatTabGroup;

  tabSelectedIndexSubject = new Subject<string>();
  tabSelectedIndex$ = this.tabSelectedIndexSubject.asObservable().pipe(
    map(index => parseInt(index, 10)),
    distinctUntilChanged()
  );
  formGroup: FormGroup;
  loader = new VerySimpleLoaderClass();
  msg = new BehaviorSubject<SimpleMessageType>('');
  isAnUpdateRequest = false;
  registrationCount = new BehaviorSubject<number>(0);
  createRoute = CrudRoutesEnum.Create;
  preSelectedTags: number[] = [];
  updatedSelectedTags: number[] = [];
  programPrices = new BehaviorSubject<ProgramPriceInterface[]>([]);
  form$ = new BehaviorSubject<FormInterface>(null);

  isFormDisabled = false;

  private _disabled = false;
  private _item: ProgramInterface;
  private _subscriptions = new Subscription();
  private _isFormInvalid = false;
  private _fragmentTrigger = true;
  private _fragmentFirstLoad = true;
  private _programId: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public service: ProgramsService,
    private formsManager: AkitaNgFormsManager<ProgramFormStateInterface>
  ) {
    super();
    super.setComponent(this);

    this.formGroup = this.fb.group({
      program_title: '',
      program_description: '',
      category: '',
      registration_start: moment(),
      registration_end: moment().add(1, 'day'),
      program_start: '',
      program_end: '',
      location_id: ''
    });

    this.formsManager.upsert('general', this.formGroup);

    this.formsManager.selectValue('general').subscribe(test => {
      console.log(test);
    });
  }

  get registrationRoute() {
    return this.router.serializeUrl(
      this.router.createUrlTree([ `../${ CoachRoutesEnum.Registrations }` ], { relativeTo: this.route.parent }));
  }

  get registrationParams(): Params {
    return {
      [ QueryParamsEnum.ProgramId ]: this._item.id
    };
  }

  navigate(event: MatTabChangeEvent) {
    if (this._fragmentTrigger) {
      this.router.navigate([], {
        fragment: event.index.toString()
      });
    }
    this._fragmentTrigger = true;
    // this.router.navigate([tabData.path], { relativeTo: this.route });
  }

  ngAfterViewInit(): void {
    this.route.fragment.pipe(
      tap(fragment => {
        if (fragment) {
          this.tabSelectedIndexSubject.next(fragment);
        } else {
          if (fragment === null && !this._fragmentFirstLoad) {
            this._fragmentTrigger = false;
          }
          this.tabSelectedIndexSubject.next('0');
        }
        if (this._fragmentFirstLoad) {
          this._fragmentFirstLoad = false;
          this.matTabGroup.realignInkBar();
        }
      })
    ).subscribe();
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  setItem(item: ProgramInterface) {
    this._item = item;

    this.formGroup.patchValue(this._item);
    this.registrationCount.next(this._item.registrations_count);

    this.programPrices.next(this._item.prices);
    this.form$.next(this._item.form);
    this.isAnUpdateRequest = true;

    this.preSelectedTags.push(...this._item.tags);
  }

  onTagsUpdated($event: TagInterface[]) {
    this.updatedSelectedTags = $event.map(x => x.id);
  }

  checkFormValidity(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        if (control.invalid) {
          this._isFormInvalid = true;
          control.markAsTouched({ onlySelf: true });
        }
      } else if (control instanceof FormGroup || control instanceof FormArray) {
        this.checkFormValidity(control);
      }
    });
  }

  onSubmit() {
    this._isFormInvalid = false;
    this.formGroup.get('prices_form').updateValueAndValidity();

    this.checkFormValidity(this.formGroup);

    if (this._isFormInvalid) {
      console.log('Invalid form');
      return;
    }

    let prices = this.formGroup.get('prices_form').value as Array<any>;
    let subOptions = [];
    for (const price of prices) {
      if (price.hasOwnProperty('sub_options_values_form')) {
        price.sub_options = price.sub_options_values_form.map(x => x.guid);
        subOptions = subOptions.concat(price.sub_options_values_form.map(x => x));
      }
    }

    prices = prices.concat(subOptions);
    // Drop the sub_options_values_form from each price
    prices = prices.map(({ sub_options_values_form, ...keepAttrs }) => keepAttrs);

    console.log(prices);

    const form: CreateProgramInterface = {
      program_title: this.formGroup.get('program_title').value,
      program_description: this.formGroup.get('program_description').value,
      category: this.formGroup.get('category').value,
      registration_start: serverDate(this.formGroup.get('registration_start').value),
      registration_end: serverDate(this.formGroup.get('registration_end').value),
      program_start: serverDate(this.formGroup.get('program_start').value),
      program_end: serverDate(this.formGroup.get('program_end').value),
      location_id: this.formGroup.get('location_id').value,
      tags: [],
      prices
    };

    if (this.isAnUpdateRequest) {
      this._update(form);
    } else {
      this._create(form);
    }
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.service.canDeactivate(!this.formGroup.dirty);
  }


  private _update(form: CreateProgramInterface) {
    // TODO: Fix this
    const value: ProgramInterface = {
      // Add all properties of the program which was passed in
      ...this._item,
      // Overwrite all properties which have been updated
      ...form
    } as any;

    this._subscriptions.add(
      super.update(value).subscribe()
    );
  }

  private _create(value: CreateProgramInterface) {
    this._subscriptions.add(
      super.create(value).subscribe()
    );
  }
}
