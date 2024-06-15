import bcrypt from 'bcrypt';
import { generateToken } from './jwt.js';
import database from '../../database/database.js';

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        let user;
        let isEmailLogin = false;

        if (username.includes('@') && username.includes('.com')) {
            isEmailLogin = true;
        }

        if (isEmailLogin) {
            // Handle email login
            [user] = await database.promise().query(
                'SELECT id, gmail, password FROM `user_profile` WHERE gmail = ?',
                [username]
            );

            if (user.length === 0) {
                return res.status(400).json({ success: false, payload: 'Email not found' });
            }

            const isPasswordCorrect = await bcrypt.compare(password, user[0].password);
            if (!isPasswordCorrect) {
                return res.status(400).json({ success: false, payload: 'Password not correct' });
            }

        } else {
            // Handle username login
            [user] = await database.promise().query(
                'SELECT id, password FROM `user_profile` WHERE username = ?',
                [username]
            );

            if (user.length === 0) {
                return res.status(400).json({ success: false, payload: 'Username not found' });
            }

            const isPasswordCorrect = await bcrypt.compare(password, user[0].password);
            if (!isPasswordCorrect) {
                return res.status(400).json({ success: false, payload: 'Password not correct' });
            }
        }

        const token = generateToken(user[0].id);
        res.cookie('token', token);
        return res.status(200).json({ success: true, token });

    } catch (error) {
        return res.status(400).json({ success: false, payload: error.message });
    }
};
