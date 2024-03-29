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
          price: 'price_1Ozel7EJWFOdn6ijtgB8hPWT',
          quantity: 1,
        },
      ],
      mode,
      success_url: successUrl,
      cancel_url: cancelUrl,
      billing_address_collection: 'auto',
      payment_method_types: ['card'],
    };
  }

  const session = await stripe.checkout.sessions.create(data);
  return session;
};

module.exports = {
  createCheckoutSession,
};
