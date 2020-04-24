import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, NgZone, OnDestroy, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { fromEvent, merge, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map, mapTo, pairwise, share, throttleTime } from 'rxjs/operators';
import { HeaderVisibilityEnum } from './models/header-visibility.enum';
import { ScrollDirectionEnum } from './models/scroll-direction.enum';

@Component({
  selector: 'ch-sticky-header',
  templateUrl: './sticky-header.component.html',
  styleUrls: ['./sticky-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('header', [
      state(
        HeaderVisibilityEnum.Hidden,
        style({ opacity: 0, transform: 'translateY(-100%)', display: 'none' })
      ),
      state(
        HeaderVisibilityEnum.Visible,
        style({ opacity: 1, transform: 'translateY(0)', display: 'block' })
      ),
      transition('* => *', animate('200ms ease-in'))
    ])
  ]
})
export class StickyHeaderComponent implements OnInit, OnDestroy {
  @Input() element: Element;

  visibility = HeaderVisibilityEnum.Visible;
  private _subscriptions = new Subscription();

  constructor(
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (!this.element) {
      console.error('A scrollable element must be inputted');
      return;
    }

    this.zone.runOutsideAngular(() => {
      const scroll$ =
        fromEvent(this.element, 'scroll', this._getEventOptions()).pipe(
          throttleTime(10),
          map(() => this.element.scrollTop),
          pairwise(),
          map(([y1, y2]): ScrollDirectionEnum => (y2 < y1 ? ScrollDirectionEnum.Up : ScrollDirectionEnum.Down)),
          distinctUntilChanged(),
          share(),
        );

      const goingUp$ = scroll$.pipe(
        filter(direction => direction === ScrollDirectionEnum.Up)
      );

      const goingDown$ = scroll$.pipe(
        filter(direction => direction === ScrollDirectionEnum.Down)
      );

      this._subscriptions.add(
        merge(
          goingUp$.pipe(mapTo(HeaderVisibilityEnum.Visible)),
          goingDown$.pipe(mapTo(HeaderVisibilityEnum.Hidden))
        ).subscribe(headerVisibility => {
          this.visibility = headerVisibility;
          this.cdr.detectChanges();
        })
      );
    });
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
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
