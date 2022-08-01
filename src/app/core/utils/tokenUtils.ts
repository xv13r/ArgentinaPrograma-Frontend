
export class TokenUtils {

  private static decodeToken(token: string) {
    if (!token) {
      return;
    }
    const _decodeToken = (token: string) => {
      try {
        return JSON.parse(atob(token));
      } catch {
        return;
      }
    };
    return token
      .split('.')
      .map(token => _decodeToken(token))
      .reduce((acc, curr) => {
        if (!!curr) acc = { ...acc, ...curr };
        return acc;
      }, Object.create(null));
  }

  static isTokenValid(token: string | number ): boolean {
    if (!token) {
      return false;
    }
    const exp = typeof token === 'string' ? this.decodeToken(token)['exp'] : token;
    return !!exp ? Math.floor(Date.now() / 1000) < exp : false;
  }

  static getRoles(token: string) {
    return this.decodeToken(token)['roles'];
  }

  static getUserId(token: string) {
    return this.decodeToken(token)['sub'].split(",")[0];
  }

  static getUsername(token: string) {
    return this.decodeToken(token)['sub'].split(",")[1];
  }
}