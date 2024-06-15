import database from "../../database/database.js";

export const getUsername = (req, res) => {
    const uid = req.userId;

    if (!uid) {
        return res.status(401).json({ success: false, message: 'Please log in' });
    }
    
    try {

        database.query('SELECT username FROM user_profile WHERE id = ?', [uid], (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ success: false, message: 'Database error', error: err.message });
            }

            if (result.length === 0) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            const username = result[0].username;

            return res.json({ success: true, data: { username }, error: null });
        });
    } catch (error) {
        console.error('Error validating token:', error);
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
};
