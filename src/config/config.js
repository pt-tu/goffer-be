const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    SERVER_HOSTNAME: Joi.string().required().description('Server hostname'),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which verify email token expires'),
    SMTP_HOST: Joi.string().description('server that will send the emails'),
    SMTP_PORT: Joi.number().description('port to connect to the email server'),
    SMTP_USERNAME: Joi.string().description('username for email server'),
    SMTP_PASSWORD: Joi.string().description('password for email server'),
    EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
    // Google related
    GOOGLE_CLIENT_ID: Joi.string().required().description('Google client id'),
    GOOGLE_CLIENT_SECRET: Joi.string().required().description('Google client secret'),
    GOOGLE_AUTH_URL: Joi.string().required().description('Google auth url'),
    GOOGLE_ACCOUNT_BASE_API_URL: Joi.string()
      .default('https://www.googleapis.com/oauth2/v2/userinfo')
      .description('Google account base api url'),
    GOOGLE_GENAI_API_KEY: Joi.string().required().description('Google GenAI api key'),
    // Cloudinary related
    CLOUDINARY_CLOUD_NAME: Joi.string().required().description('Cloudinary cloud name'),
    CLOUDINARY_API_KEY: Joi.string().required().description('Cloudinary api key'),
    CLOUDINARY_API_SECRET: Joi.string().required().description('Cloudinary api secret'),
    // Stripe
    STRIPE_PUBLISHABLE_KEY: Joi.string().required().description('Stripe public key'),
    STRIPE_SECRET_KEY: Joi.string().required().description('Stripe secret key'),
    // Client
    CLIENT_DOMAIN: Joi.string().description('Client domain'),
    // OpenAI,
    OPENAI_SECRET_KEY: Joi.string().required().description('OpenAI api key'),
    // AssemblyAI,
    ASSEMBLYAI_API_KEY: Joi.string().required().description('AssemblyAI api key'),
    // Stream Chat
    STREAM_PUBLIC_KEY: Joi.string().required().description('Stream Chat public key'),
    STREAM_SECRET_KEY: Joi.string().required().description('Stream Chat secret key'),
    // Recombee
    RECOMBEE_DATABASE_ID: Joi.string().required().description('Recombee database id'),
    RECOMBEE_PRIVATE_TOKEN: Joi.string().required().description('Recombee private token'),
    RECOMBEE_DB_REGION: Joi.string().required().description('Recombee database region'),
    // AWS
    SECRET_ACCESS_KEY: Joi.string().required().description('AWS secret access key'),
    ACCESS_KEY_ID: Joi.string().required().description('AWS access key id'),
    // QDRANT
    QDRANT_API_KEY: Joi.string().required().description('Qdrant api key'),
    QDRANT_URL: Joi.string().required().description('Qdrant url'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  serverHostname: envVars.SERVER_HOSTNAME,
  port: envVars.PORT,
  domain: `${envVars.SERVER_HOSTNAME}:${envVars.PORT}`,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
    cookieRefreshOptions: {
      // TODO: change this to true when deploy
      secure: false,
      httpOnly: true,
    },
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },
  google: {
    clientId: envVars.GOOGLE_CLIENT_ID,
    clientSecret: envVars.GOOGLE_CLIENT_SECRET,
    authUrl: envVars.GOOGLE_AUTH_URL,
    accountApiBaseUrl: envVars.GOOGLE_ACCOUNT_BASE_API_URL,
    genAI: {
      apiKey: envVars.GOOGLE_GENAI_API_KEY,
    },
  },
  cloudinary: {
    cloudName: envVars.CLOUDINARY_CLOUD_NAME,
    apiKey: envVars.CLOUDINARY_API_KEY,
    apiSecret: envVars.CLOUDINARY_API_SECRET,
  },
  stripe: {
    publishableKey: envVars.STRIPE_PUBLISHABLE_KEY,
    secretKey: envVars.STRIPE_SECRET_KEY,
  },
  client: {
    domain: envVars.CLIENT_DOMAIN || 'http://localhost:5173',
  },
  openai: {
    secretKey: envVars.OPENAI_SECRET_KEY,
  },
  assemblyai: {
    apiKey: envVars.ASSEMBLYAI_API_KEY,
  },
  stream: {
    publicKey: envVars.STREAM_PUBLIC_KEY,
    secretKey: envVars.STREAM_SECRET_KEY,
  },
  recombee: {
    databaseId: envVars.RECOMBEE_DATABASE_ID,
    privateToken: envVars.RECOMBEE_PRIVATE_TOKEN,
    dbRegion: envVars.RECOMBEE_DB_REGION,
  },
  aws: {
    credentials: {
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
      accessKeyId: process.env.ACCESS_KEY_ID,
    },
  },
  qdrant: {
    apiKey: envVars.QDRANT_API_KEY,
    url: envVars.QDRANT_URL,
    collectionName: 'goffer',
  },
};
