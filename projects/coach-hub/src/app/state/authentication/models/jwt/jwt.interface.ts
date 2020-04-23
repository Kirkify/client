export interface JwtInterface {
  // Audience: User Id
  aud: string;

  // Configures the expiration time
  exp: number;

  // The time that the token was issued
  iat: number;

  // Token Id
  jti: string;

  // Configures the time before which the token cannot be accepted
  nbf: number;

  // User scopes
  scopes: string[];

  // Configures the subject
  sub: string;
}
