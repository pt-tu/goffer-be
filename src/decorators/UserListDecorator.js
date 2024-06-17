/* eslint-disable no-param-reassign */
class UserListDecorator {
  constructor(users) {
    this.users = users;
  }

  async getUsers() {
    let _users = this.users;
    try {
      _users = this.users.map((user) => user.toJSON());
    } catch (error) {
      // Do nothing
    }

    _users = _users.map((user) => {
      const domain = user.portfolioDomain;
      if (domain) {
        delete user.portfolioDomain;
        user.portfolio = {
          ...user.portfolio,
          portfolioDomain: domain,
          palette: JSON.parse(user.portfolio.palette),
        };
      }
      return user;
    });
    return _users;
  }
}

module.exports = UserListDecorator;
