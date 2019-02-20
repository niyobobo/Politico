import jwt from 'jsonwebtoken';
import db from '../database/queries'
import executor from '../database/queryExecutor';

const Auth = {
    async verifyToken(req, res, next) {
        const token = req.headers['access-token'];
        if (!token) {
            return res.status(400).send({
                status: res.statusCode,
                error: 'Token is not provided'
            });
        }

        try {
            const decoded = await jwt.verify(token, process.env.JWT_SECRET);
            const { rows } = await executor.query(db.getUserById, [decoded.id]);
            if (!rows[0]) {
                return res.status(400).send({
                    status: res.statusCode,
                    error: 'Token expired'
                });
            }
            req.user = { id: decoded.id }
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