import database from "../../database/database.js";

export const getAllChores = (req, res) => {

    const uid = req.userId;

    if (!uid) {
        return res.status(401).json({ success: false, message: 'Please log in' });
    }

    database.query('SELECT * FROM chores WHERE uid = ?', [uid], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Database error', error: err.message });
        }

        return res.json({ success: true, data: result, error: null });
    });
};
