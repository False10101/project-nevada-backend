import database from "../../database/database.js";
import { validateToken } from "../auth/jwt.js";

export const checkPin = (req, res) => {
    const { pin } = req.body;
    const uid = req.userId;

    if (!uid) {
        return res.status(401).json({ success: false, message: 'Please log in' });
    }
    
    try {
        const uid = validateToken(token);

        database.query('SELECT pin FROM user_profile WHERE id = ?', [uid], (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ success: false, message: 'Database error', error: err.message });
            }

            if (result.length === 0) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            const storedPin = result[0].pin;

            if (pin == storedPin) {
                return res.json({ success: true, message: 'PIN is correct' });
            } else {
                return res.json({ success: false, message: 'Incorrect PIN' });
            }
        });
    } catch (error) {
        console.error('Error validating token:', error);
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
};
