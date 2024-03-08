import pkg from 'jsonwebtoken';
const { verify } = pkg;

export default (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).send("No Token, Authorization Denied");
    }
    try {
        const decoded = verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (e) {
        // 401: UNAUTHORIZED
        return res.status(401).send("Invalid Token");
    }
};
