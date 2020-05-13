import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserProfileStore } from './user-profile.store';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ProfileInterface } from '../models/profile.interface';
import { environment } from '../../../../../../environments/environment';
import { JsonResponseInterface } from '../../../../../models/json-response.interface';
import { UserInterface } from '../../../../../state/authentication/models/user.interface';
import { ChangeEmailInterface } from '../models/change-email.interface';

@Injectable({ providedIn: 'root' })
export class UserProfileService {

  constructor(
    private userProfileStore: UserProfileStore,
    private http: HttpClient) {
  }

  getProfile(): Observable<ProfileInterface> {

    const path = '/user/profile';

    this.userProfileStore.setLoading(true);

    return this.http
      .get<ProfileInterface>(environment.api_url + path).pipe(
        finalize(() => this.userProfileStore.setLoading(false)),
        catchError(err => {
          return throwError(err);
        }),
        tap(profile => {
          this.userProfileStore.update({
            profile,
            fetched: true
          });
        })
      );
  }

  updateProfile(profile: Partial<ProfileInterface>): Observable<ProfileInterface> {

    const path = '/user/profile';

    this.userProfileStore.setLoading(true);

    return this.http
      .post<JsonResponseInterface<ProfileInterface>>(environment.api_url + path, JSON.stringify(profile)).pipe(
        finalize(() => this.userProfileStore.setLoading(false)),
        map(res => res.data),
        tap(newProfile => {
          this.userProfileStore.update({
            profile: newProfile,
            fetched: true
          });
        })
      );
  }

  updateUser(user: Partial<UserInterface>): Observable<UserInterface> {

    const path = '/user';

    this.userProfileStore.setLoading(true);

    return this.http
      .post<UserInterface>(environment.api_url + path, JSON.stringify(user))
      .pipe(
        // tap(res => this.store.update({ user: res }))
      );
  }

  updateEmail(user: ChangeEmailInterface): Observable<void> {

    const path = '/user/email';

    return this.http
      .post<UserInterface>(environment.api_url + path, JSON.stringify(user))
      .pipe(
        map(res => {
          // TODO: Use user store
          // this.authService.updateUser(res);
        })
      );
  }
}
