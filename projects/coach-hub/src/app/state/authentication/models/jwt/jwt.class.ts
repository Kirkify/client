export class JwtClass {
  urlBase64Decode(str: string) {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        // Illegal base64url string
        throw null;
    }
    return decodeURIComponent(window['escape'](window.atob(output)));
  }

  decodeToken(token: string) {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('JWT must have 3 parts');
    }
    const decoded = this.urlBase64Decode(parts[1]);
    if (!decoded) {
      throw new Error('Cannot decode the token');
    }
    return JSON.parse(decoded);
  }

  public getTokenExpirationDate(accessToken: string): number {
    const decoded = this.decodeToken(accessToken);

    if (!decoded.hasOwnProperty('exp')) {
      return null;
    }

    // If you want to convert the timestamp to UTC
    const date = new Date(0);
    date.setUTCSeconds((decoded as any).exp);
    console.log(date);

    return (decoded as any).exp;
  }

  public isTokenExpired(accessToken: string, offsetSeconds?: number): boolean {
    return false;
    const tokenExpiresAt = this.getTokenExpirationDate(accessToken);
    // TODO: Make offset 5 minutes (60 * 5)
    offsetSeconds = offsetSeconds || (60 * 5);

    if (tokenExpiresAt === null) {
      return false;
    }

    const currentTime = Math.floor(Date.now() / 1000);

    return tokenExpiresAt < (currentTime + offsetSeconds);
  }
}
