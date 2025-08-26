const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
    const auth = req.header('Authorization');
    const token = auth && auth.startsWith('Bearer ') ? auth.slice(7) : null;

    if (!token) {
        return res.status(401).json({ error: "Missing token" });
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = payload;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}

module.exports = { authMiddleware };
