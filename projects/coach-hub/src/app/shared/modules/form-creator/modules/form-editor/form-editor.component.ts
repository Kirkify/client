import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  NgZone, OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormCreatorService } from '../../services/form-creator.service';
import { FormCreatorQuery } from '../../state/form-creator.query';
import { QuestionTypeEnum } from '../../models/question-type.enum';
import { BehaviorSubject, combineLatest, fromEvent, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, map, share, startWith, tap, throttleTime } from 'rxjs/operators';

type AbsoluteFixed = 'absolute' | 'fixed';
type FlexDirection = 'row' | 'column';

@Component({
  selector: 'ch-form-editor',
  templateUrl: './form-editor.component.html',
  styleUrls: [ './form-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormEditorComponent implements OnInit, OnDestroy, AfterViewInit {

  /**
   * We use the container of this element to try and find the first
   * Scrollable parent
   */
  @ViewChild('div') divElementRef: ElementRef<HTMLDivElement>;

  /**
   * This setter keeps track of the width of the parent containing
   * This component
   */
  @Input('outerContainerWidth')
  set containerWidth(outerContainerWidth: number) {
    // console.log(outerContainerWidth);
    const val = outerContainerWidth - this.containerMaxWidth;

    if (val <= 200) {
      this._isScreenMobileSubject.next(true);
    } else {
      this._isScreenMobileSubject.next(false);
    }

    if (this.container) {
      // console.log(this.container.getClientRects());
    }

  }

  @Input() container: HTMLDivElement;

  @Input() containerMaxWidth = 770;

  flexDirection$: Observable<FlexDirection>;
  position$: Observable<AbsoluteFixed>;
  width$: Observable<number>;
  top$: Observable<number>;
  right$: Observable<number>;
  bottom$: Observable<number>;
  left$: Observable<number>;

  private readonly ABSOLUTE_WIDTH = 42;
  private readonly ABSOLUTE_RIGHT = -50;

  private _flexDirectionSubject = new BehaviorSubject<FlexDirection>('column');
  private _positionSubject = new BehaviorSubject<AbsoluteFixed>('absolute');
  private _widthSubject = new BehaviorSubject<number>(this.ABSOLUTE_WIDTH);
  private _topSubject = new BehaviorSubject<number>(0);
  private _rightSubject = new BehaviorSubject<number>(this.ABSOLUTE_RIGHT);
  private _bottomSubject = new BehaviorSubject<number>(null);
  private _leftSubject = new BehaviorSubject<number>(null);

  private _isScreenMobileSubject = new BehaviorSubject<boolean>(false);
  private _subscriptions = new Subscription();

  constructor(
    private service: FormCreatorService,
    private query: FormCreatorQuery,
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) {
    this.position$ = this._positionSubject.asObservable().pipe(
      distinctUntilChanged()
    );

    this.flexDirection$ = this._flexDirectionSubject.asObservable().pipe(
      distinctUntilChanged()
    );

    this.width$ = this._widthSubject.asObservable().pipe(
      distinctUntilChanged()
    );

    this.top$ = this._topSubject.asObservable().pipe(
      distinctUntilChanged()
    );

    this.right$ = this._rightSubject.asObservable().pipe(
      distinctUntilChanged()
    );

    this.bottom$ = this._bottomSubject.asObservable().pipe(
      distinctUntilChanged()
    );

    this.left$ = this._leftSubject.asObservable().pipe(
      distinctUntilChanged()
    );
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  ngAfterViewInit(): void {
    // Find the first parent which is scrollable
    const sp = scrollParent(this.divElementRef.nativeElement);

    this.zone.runOutsideAngular(() => {
      const scroll$ = fromEvent(sp, 'scroll', this._getEventOptions()).pipe(
        startWith(0),
        throttleTime(10),
        map(() => sp.scrollTop),
        distinctUntilChanged(),
        share()
      );

      const isScreenMobile$ = this._isScreenMobileSubject.asObservable();

      this._subscriptions.add(
        combineLatest(
          scroll$,
          isScreenMobile$
        ).pipe(
          tap(([top, isMobile]) => {
            if (isMobile) {
              const rects = this.container.getClientRects();
              if (rects.length) {
                const { left, width } = rects[0];
                this._flexDirectionSubject.next('row');
                this._positionSubject.next('fixed');
                this._topSubject.next(null);
                this._rightSubject.next(null);
                this._bottomSubject.next(0);
                this._leftSubject.next(left);
                this._widthSubject.next(width);
                this.cdr.detectChanges();
              }
            } else {
              this._flexDirectionSubject.next('column');
              this._positionSubject.next('absolute');
              this._topSubject.next(top);
              this._rightSubject.next(this.ABSOLUTE_RIGHT);
              this._bottomSubject.next(null);
              this._leftSubject.next(null);
              this._widthSubject.next(this.ABSOLUTE_WIDTH);
              this.cdr.detectChanges();
            }
          })
        ).subscribe()
      );
    });
  }

  addQuestion(type = QuestionTypeEnum.ShortAnswer) {
    this.service.addNewQuestion(type);
  }

  createSection() {
    this.service.createNewSection();
  }

  validateForm() {
    console.log(this.query.getValue());
  }

  addTitleAndDescription() {
    this.addQuestion(QuestionTypeEnum.TitleAndDescription);
  }

  private _getEventOptions() {
    let passiveSupported = false;

    try {
      const options = {
        // This function will be called when the browser
        get passive() {
          // attempts to access the passive property.
          passiveSupported = true;
          return;
        }
      } as any;
      const handler = () => ({});

      window.addEventListener('test', handler, options);
      window.removeEventListener('test', handler, options);
    } catch (err) {
      passiveSupported = false;
    }

    if (passiveSupported) {
      return {
        capture: true,
        passive: true
      };
    } else {
      return undefined;
    }
  }
}

// more minimal version of https://github.com/olahol/scrollparent.js/blob/master/scrollparent.js
const regex = /(auto|scroll)/;

const style = (node, prop) =>
  getComputedStyle(node, null).getPropertyValue(prop);

const scroll = (node) =>
  regex.test(
    style(node, 'overflow') +
    style(node, 'overflow-y') +
    style(node, 'overflow-x'));

export const scrollParent = (node) => {
  if (!node || node === document.body) {
    return document.body;
  } else {
    if (scroll(node)) {
      return node;
    } else {
      return scrollParent(node.parentNode);
    }
  }
};

