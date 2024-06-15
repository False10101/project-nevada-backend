import database from "../../database/database.js";

export const getUserProfile = (req, res) => {
    database.query('SELECT * FROM user_profile', (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Database error', error: err.message });
        }

        return res.json({ success: true, data: result, error: null });
    });
};
