const jwt = require('jsonwebtoken');

function auth(req, res, next) {

    const token = req.header('auth-token');
    if (!token) return res.status(401).json({ 'error': 'Access denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        return res.status(400).json({ 'error': 'An error occured' });
    }
}

module.exports = auth;