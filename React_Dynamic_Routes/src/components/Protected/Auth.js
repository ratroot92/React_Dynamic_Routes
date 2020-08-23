class Auth {
  constructor() {
    let User = JSON.parse(localStorage.getItem("logged_user"));
    console.log(User == null);
    if (User == null) {
      this.authenticated = false;
    } else {
      this.authenticated = true;
    }
  }

  login(cb) {
    this.authenticated = true;
    cb();
  }

  logout(cb) {
    localStorage.clear();
    this.authenticated = false;
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
