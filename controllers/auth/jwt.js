import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWTSecretKey = process.env.secretKey;

export const generateToken = (id) => {
	const token = jwt.sign(
		{
			exp: Math.floor(Date.now() / 1000) + 60 * 60 * 168, 
			userId: id,
		},
		JWTSecretKey
	);
	return token;
};

export const validateToken = (token) => {
	const id = jwt.verify(token, JWTSecretKey);
	return id.userId;
};


export const checkAuth = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            throw new Error('No token provided');
        }

        const decodedToken = jwt.verify(token, JWTSecretKey);
        if (!decodedToken) {
            throw new Error('Invalid token');
        }

        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Please log in!' });
    }
};

