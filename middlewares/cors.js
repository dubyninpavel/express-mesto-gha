const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'https://localhost:3000',
  'http://localhost:3000',
  'https://project.mesto.russia.nomoredomains.icu/',
  'http://project.mesto.russia.nomoredomains.icu/',
  'https://project.mesto.russia.nomoredomains.icu',
  'http://project.mesto.russia.nomoredomains.icu',
  'https://api.project.mesto.russia.nomoredomains.icu/',
  'http://api.project.mesto.russia.nomoredomains.icu/',
  'https://api.project.mesto.russia.nomoredomains.icu',
  'http://api.project.mesto.russia.nomoredomains.icu',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;

  const requestHeaders = req.headers['access-control-request-headers'];
  res.header('Access-Control-Allow-Credentials', true);
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
};

module.exports = { cors };
