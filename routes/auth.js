const jwt = require('jsonwebtoken');
const SECRET = 'budgettrack_secret_key';

function authMiddleware(req, res, next) {
  const header = req.headers['authorization'];
  const token = header ? header.split(' ')[1] : null;
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = authMiddleware;