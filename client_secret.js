require('dotenv').config();

module.exports = {
  type: process.env.CLIENT_SECRET_TYPE,
  project_id: process.env.CLIENT_SECRET_PROJECT_ID,
  private_key_id: process.env.CLIENT_SECRET_PRIVATE_KEY_ID,
  private_key: process.env.CLIENT_SECRET_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.CLIENT_SECRET_CLIENT_EMAIL,
  client_id: process.env.CLIENT_SECRET_CLIENT_ID,
  auth_uri: process.env.CLIENT_SECRET_AUTH_URI,
  token_uri: process.env.CLIENT_SECRET_TOKEN_URI,
  auth_provider_x509_cert_url:
    process.env.CLIENT_SECRET_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_SECRET_CLIENT_X509_CERT_URL,
};
