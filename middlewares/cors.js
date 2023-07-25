const allowedCors = [
  'http://localhost:3000',
  'https://mesto.student.project.nomoredomains.xyz',
  'http://mesto.student.project.nomoredomains.xyz'
];

const cors = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', '*');
  }
  next();
};

const corsOptions = (req, res) => {
  const { method } = req.headers;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
}

module.exports = {
  cors,
  corsOptions
};