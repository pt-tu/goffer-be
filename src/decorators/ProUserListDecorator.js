const { paymentService } = require('../services');
const UserListDecorator = require('./UserListDecorator');

class ProUserListDecorator extends UserListDecorator {
  async getUsers() {
    const users = await super.getUsers();
    const proUsers = await paymentService.listProByUsers(users);
    return users.map((user) => {
      // eslint-disable-next-line no-param-reassign
      user.isPro = proUsers.some((proUser) => proUser.id === user.id);
      return user;
    });
  }
}

module.exports = ProUserListDecorator;
