import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const token = req.headers.access_token;
    // 401: UNAUTHORIZED
    if (!token) return res.status(401).send();

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (error) {
        return res.status(401).send();
    }

    return next();
};