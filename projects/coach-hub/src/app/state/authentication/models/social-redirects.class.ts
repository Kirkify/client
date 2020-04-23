import { environment } from '../../../../../environments/environment';

enum SocialProvidersEnum {
  GitHub = 'github',
  Facebook = 'facebook',
  Google = 'google',
  LinkedIn = 'linkedin',
  Twitter = 'twitter'
}

export class SocialRedirectsClass {
  private _socialCallbackUrl = encodeURIComponent(`${environment.url}/login?provider=`);

  // GITHUB
  private _githubClientId = '9386e083fb15ff2654dd';
  private _githubScopes = 'user:email';
  private _githubRedirectUrl =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${this._githubClientId}` +
    `&redirect_uri=${this._socialCallbackUrl}${SocialProvidersEnum.GitHub}` +
    `&scope=${this._githubScopes}` +
    `&allow_signup=false`;
  get githubRedirectUrl() {
    return this._githubRedirectUrl;
  }

  // FACEBOOK
  private _facebookClientId = '2389397317752364';
  private _facebookScopes = 'public_profile,email';
  private _facebookRedirectUrl =
    `https://www.facebook.com/v2.12/dialog/oauth` +
    `?client_id=${this._facebookClientId}` +
    `&redirect_uri=${this._socialCallbackUrl}${SocialProvidersEnum.Facebook}` +
    `&scope=${this._facebookScopes}` +
    `&state=test1234`;
  get facebookRedirectUrl() {
    return this._facebookRedirectUrl;
  }

  // GOOGLE
  private _googleClientId = '392461224100-rgo5t41npt567pu13paoh6cs2naeh7v3.apps.googleusercontent.com';
  private _googleScopes =
    encodeURIComponent('https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile');
  private _googleRedirectUrl =
    `https://accounts.google.com/o/oauth2/v2/auth` +
    `?client_id=${this._googleClientId}` +
    '&response_type=code' +
    `&redirect_uri=${this._socialCallbackUrl}${SocialProvidersEnum.Google}` +
    `&scope=${this._googleScopes}` +
    `&state=test1234`;
  get googleRedirectUrl() {
    return this._googleRedirectUrl;
  }

  // LINKEDIN
  private _linkedinClientId = '78rwm8wdt6rnrn';
  private _linkedinScopes = encodeURIComponent('r_basicprofile r_emailaddress');
  private _linkedinRedirectUrl =
    `https://www.linkedin.com/oauth/v2/authorization` +
    `?client_id=${this._linkedinClientId}` +
    '&response_type=code' +
    `&redirect_uri=${this._socialCallbackUrl}${SocialProvidersEnum.LinkedIn}` +
    `&scope=${this._linkedinScopes}` +
    `&state=test1234`;
  get linkedinRedirectUrl() {
    return this._linkedinRedirectUrl;
  }
}
