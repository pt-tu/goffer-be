const _stripe = require('stripe');
const config = require('../config/config');

const stripe = _stripe(config.stripe.secretKey);

/**
 *
 * @param {{mode: string; successUrl: string; cancelUrl: string;}} requestData
 * @returns {Promise<_stripe.Stripe.Checkout.Session>}
 */
const createCheckoutSession = async (requestData) => {
  const { mode, successUrl, cancelUrl } = requestData;
  let data = {};
  if (mode === 'subscription') {
    data = {
      line_items: [
        {
          price: 'price_1PNFbOEJWFOdn6ijClFMYygE',
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

module.exports = {
  createCheckoutSession,
  getCheckoutSession,
};
