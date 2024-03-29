const _stripe = require('stripe');
const config = require('../config/config');

const stripe = _stripe(config.stripe.secretKey);

const createCheckoutSession = async (paymentBody) => {
  const { mode, successUrl, cancelUrl } = paymentBody;
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
