
const allowedCors = [
  'http://localhost:3000',
  'https://localhost:3000',
  'localhost:3000'
];

const cors = (req, res, next) => {
  const { origin } = req.headers;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  console.log(origin);
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
  next();
};

module.exports = {
  cors
};
