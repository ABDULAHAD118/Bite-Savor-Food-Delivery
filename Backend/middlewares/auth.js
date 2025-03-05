import jwt from 'jsonwebtoken';

const createToken = async (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    try {
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = verifyToken.id;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

export { createToken, authMiddleware }