import jwt from 'jsonwebtoken';
import db from '../database/queries'
import executor from '../database/queryExecutor';

const Auth = {
  async verifyToken(req, res, next) {
    const token = req.headers['access-token'];
    if (!token) {
      return res.status(401).send({
        status: res.statusCode,
        error: 'Unauthorized, No token provided'
      });
    }

    try {
      const user = await jwt.verify(token, process.env.JWT_SECRET);
      const { rows } = await executor.query(db.getUserById, [user.id]);
      if (!rows[0]) {
        return res.status(400).send({
          status: res.statusCode,
          error: 'Token expired'
        });
      }
      req.user = { id: user.id, isAdmin: user.isAdmin };
      next();
    } catch (error) {
      return res.status(400).send({
        status: res.statusCode,
        error: 'Invalid token'
      });
    }
  }
}

export default Auth;
