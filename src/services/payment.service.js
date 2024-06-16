const _stripe = require('stripe');
const config = require('../config/config');
const { PRICE_ENUM } = require('../config/stripe');
const userService = require('./user.service');

const stripe = _stripe(config.stripe.secretKey);

/**
 *
 * @param {{mode: string; successUrl: string; cancelUrl: string; customer: string;}} requestData
 * @returns {Promise<_stripe.Stripe.Checkout.Session>}
 */
const createCheckoutSession = async (requestData, price = PRICE_ENUM.ORG_LORD_PLAN) => {
  const { mode, successUrl, cancelUrl } = requestData;
  let data = {};
  if (mode === 'subscription') {
    data = {
      line_items: [
        {
          price,
          quantity: 1,
        },
      ],
      mode,
      success_url: successUrl,
      cancel_url: cancelUrl,
      billing_address_collection: 'auto',
      payment_method_types: ['card'],
      subscription_data: {
        trial_period_days: 7,
      },
      customer: requestData.customer,
    };
  }

  const session = await stripe.checkout.sessions.create(data);
  return session;
};

/**
 *
 * @param {string} sessionId
 * @returns {Promise<_stripe.Stripe.Checkout.Session>}
 */
const getCheckoutSession = async (sessionId) => {
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  return session;
};

/**
 *
 * @param {string} customerId
 * @param {string} priceId
 * @returns {Promise<boolean>}
 */
const hasSubscription = async (customerId, priceId) => {
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    price: priceId,
  });
  return !!subscriptions.data?.find((sub) => sub.status === 'active' || sub.status === 'trialing');
};

const createCustomer = async (email) => {
  const customer = await stripe.customers.create({ email });
  return customer;
};

const getCustomerData = async (userId) => {
  const user = await userService.getUserById(userId);

  const result = {
    customerEmail: user.email,
  };

  if (!user.customerId) {
    const customer = await createCustomer(user.email);
    await userService.updateUserById(userId, { customerId: customer.id });
    result.customerId = customer.id;
  } else {
    result.customerId = user.customerId;
  }

  return result;
};

/**
 *
 * @param {string} [userId]
 * @returns {Promise<boolean>}
 */
const checkProByUserId = async (userId) => {
  if (!userId) return false;
  const customer = await getCustomerData(userId);
  const result = await hasSubscription(customer.customerId, PRICE_ENUM.INDIVIDUAL_STAR_PLAN);
  return !!result;
};

module.exports = {
  createCheckoutSession,
  getCheckoutSession,
  hasSubscription,
  getCustomerData,
  checkProByUserId,
};
