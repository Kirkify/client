import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription, throwError } from 'rxjs';
import { SportInterface } from '../../../../../../../app/models/sport.interface';
import { SimpleMessageType } from '../../../../../../../../shared/modules/simple-message/models/simple-message.type';
import { ActivatedRoute, Router } from '@angular/router';
import { SportsQuery } from '../../../../../../../app/state/sports/sports.query';
import { CoachApplicationService } from '../../services/coach-application.service';
import { CoachProfileInterface } from '../../../../../../../app/models/coach-profile.interface';
import { catchError, tap } from 'rxjs/operators';
import { RootRoutingQuery } from '../../../../../../../../state/root-routing/root-routing.query';

@Component({
  selector: 'ch-coach-application-form',
  templateUrl: './coach-application-form.component.html',
  styleUrls: [ './coach-application-form.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoachApplicationFormComponent implements OnInit {

  @Input('profile')
  set profile(profile: CoachProfileInterface) {
    if (profile) {
      this.formGroup.patchValue(profile);
      this.formGroup.disable();
      this.hideSubmit = true;
    }
  }

  formGroup: FormGroup;
  sportList: Observable<SportInterface[]>;
  errorMsg = new BehaviorSubject<SimpleMessageType>('');
  hideSubmit = false;
  private _subscriptions = new Subscription();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private sportsQuery: SportsQuery,
    private rootRoutingQuery: RootRoutingQuery,
    private service: CoachApplicationService) {
    // Subscribe to the sport list
    this.sportList = this.sportsQuery.selectAll();

    this.formGroup = this.fb.group({
      sports: [ [], [ Validators.required ] ],
      coaching_experience: [ '', [ Validators.required, Validators.minLength(140) ] ],
      athletic_highlights: [ '', [ Validators.required, Validators.minLength(140) ] ],
      session_plan: [ '', [ Validators.required, Validators.minLength(140) ] ],
      one_sentence_bio: [ '', [ Validators.required, Validators.maxLength(180) ] ]
    });
  }

  ngOnInit() {

  }

  onSubmit() {
    if (this.formGroup.invalid) {
      this.router.navigate([ this.rootRoutingQuery.getCoachRoute ]);
      return;
    }

    const value: CoachProfileInterface = {
      sports: this.formGroup.get('sports').value,
      coaching_experience: this.formGroup.get('coaching_experience').value,
      athletic_highlights: this.formGroup.get('athletic_highlights').value,
      session_plan: this.formGroup.get('session_plan').value,
      one_sentence_bio: this.formGroup.get('one_sentence_bio').value
    };

    this._subscriptions.add(
      this.service.createNewCoachProfile(value).pipe(
        tap(() => {
          // this.uiService.showSnackbar('Your coach profile has been successfully created');
          this.router.navigate([ this.rootRoutingQuery.getCoachRoute ]);
        }),
        catchError(err => {
          this.errorMsg.next(err);
          return throwError(err);
        }),
      ).subscribe()
    );
  }

}
