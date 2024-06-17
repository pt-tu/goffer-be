const { paymentService } = require('../services');
const UserDecorator = require('./UserDecorator');

class ProUserDecorator extends UserDecorator {
  async getUser() {
    const user = await super.getUser();
    const isPro = await paymentService.checkProByUserId(user.id);
    user.isPro = isPro;
    return user;
  }
}

module.exports = ProUserDecorator;
