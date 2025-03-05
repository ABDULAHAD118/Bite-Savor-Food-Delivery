import jwt from 'jsonwebtoken';

const createToken = async (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

export { createToken }