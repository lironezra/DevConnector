const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  facebookClientId: process.env.FACEBOOK_CLIENT_ID,
  facebookClientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  facebookCallbackUrl: process.env.FACEBOOK_CALLBACK_URL,
  jwtSecret: process.env.JWT_SECRET,
  githubToken: process.env.GITHUB_TOKEN,
};
