class UserDecorator {
  constructor(user) {
    this.user = user;
  }

  async getUser() {
    let _user = this.user;
    try {
      _user = this.user.toJSON();
    } catch (error) {
      // Do nothing
    }

    const domain = _user.portfolioDomain;
    if (domain) {
      delete _user.portfolioDomain;
      _user.portfolio = {
        ..._user.portfolio,
        portfolioDomain: domain,
        palette: JSON.parse(_user.portfolio.palette),
      };
    }
    return _user;
  }
}

module.exports = UserDecorator;
