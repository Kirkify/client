import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { FormHttpService } from '../../../../services/form-http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ch-form-creator-landing',
  templateUrl: './form-creator-landing.component.html',
  styleUrls: ['./form-creator-landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormCreatorLandingComponent implements OnInit, OnDestroy {

  private _subscriptions = new Subscription();

  constructor(
    private service: FormHttpService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  createNew() {
    this._subscriptions.add(
      this.service.createNewForm().pipe(
        tap(params => {
          this.router.navigate(['edit', params.id], {
            relativeTo: this.route
          });
        })
      ).subscribe()
    );
  }
}
