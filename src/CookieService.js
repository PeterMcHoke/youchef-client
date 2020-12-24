class CookieService {
  static LS_KEY = '_loginInfo';

  static getLoginInfo(user, token) {
    const data = window.localStorage.getItem(CookieService.LS_KEY);
    if (!data)
      return { user: null, token: null };
    else
      return JSON.parse(data);
  }

  static setLoginInfo(user, token) {
    window.localStorage.setItem(CookieService.LS_KEY, JSON.stringify({ user, token }));
  }

  static deleteLoginInfo() {
      window.localStorage.removeItem(CookieService.LS_KEY)
  }
}

export default CookieService;
