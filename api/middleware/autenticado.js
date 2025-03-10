const { verify } = require('jsonwebtoken');
const jsonSecret = require('../config/jsonSecret.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send('Access token nao informado.');
  }

  const [, accessToken] = token.split(' ');

  try {
    const { id, email } = verify(accessToken, jsonSecret.secret);

    req.usuarioId = id;
    req.usuarioEmail = email;

    return next();
  } catch (err) {
    res.status(401).send('Usuario nao autorizado.');
  }
};
