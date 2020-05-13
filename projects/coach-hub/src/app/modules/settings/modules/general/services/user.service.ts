import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfileInterface } from '../models/profile.interface';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { ChangeEmailInterface } from '../models/change-email.interface';
import { JsonResponseInterface } from '../../../../../models/json-response.interface';
import { UserProfileStore } from '../state/user-profile.store';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    // private store: CurrentUserStore,
    private userProfileStore: UserProfileStore) {
  }

  // updateUser(user: Partial<UserInterface>): Observable<UserInterface> {
  //
  //   const path = '/user';
  //
  //   return this.http
  //     .post<UserInterface>(environment.api_url + path, JSON.stringify(user))
  //     .pipe(
  //       tap(res => this.store.update({ user: res }))
  //     );
  // }

  // updateEmail(user: ChangeEmailInterface): Observable<void> {
  //
  //   const path = '/user/email';
  //
  //   return this.http
  //     .post<UserInterface>(environment.api_url + path, JSON.stringify(user))
  //     .pipe(
  //       map(res => {
  //         // TODO: Use user store
  //         // this.authService.updateUser(res);
  //       })
  //     );
  // }

  getProfile(): Observable<ProfileInterface> {

    const path = '/user/profile';

    this.userProfileStore.setLoading(true);

    return this.http
      .get<ProfileInterface>(environment.api_url + path).pipe(
        catchError(err => {
          return throwError(err);
        }),
        finalize(() => this.userProfileStore.setLoading(false)),
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
        map(res => res.data),
        tap(newProfile => {
          this.userProfileStore.update({
            profile: newProfile,
            fetched: true
          });
        }),
        finalize(() => this.userProfileStore.setLoading(false))
      );
  }

}
