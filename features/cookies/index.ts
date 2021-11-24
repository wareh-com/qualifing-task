import JsCookie from 'js-cookie';
import isNumber from 'lodash/isNumber';

export default class Cookies {
  private req: any;
  private res: any;

  constructor(req?: any, res?: any) {
    this.req = req;
    this.res = res;
  }

  set(key: string, value: string, expiresInDays?: number) {
    if (this.res) {
      const options = isNumber(expiresInDays) ? { expires: new Date(Date.now() + expiresInDays * 864e+5) } : {};
      this.res.cookie(key, value, options);
    } else {
      const options: JsCookie.CookieAttributes = isNumber(expiresInDays) ? { expires: expiresInDays } : {};
      return JsCookie.set(key, value, options);
    }
  }

  get(key: string): string | undefined {
    if (this.req) {
      return this.req.cookies[key];
    } else {
      return JsCookie.get(key);
    }
  }

  remove(key: string) {
    if (this.req) {
      this.res.cookie(key, undefined);
    } else {
      JsCookie.remove(key);
    }
  }
}
