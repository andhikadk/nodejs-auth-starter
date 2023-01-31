import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    req.email = user.email;
    next();
  });
};

export const adminOnly = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, async (err, user) => {
    if (err) return res.sendStatus(403);
    if (user.role !== 'admin')
      return res.status(403).json({ message: 'Admin only' });
    next();
  });
};
