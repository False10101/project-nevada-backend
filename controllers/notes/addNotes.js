import database from "../../database/database.js";

export const addNote = (req, res) => {

    const uid = req.userId;
    const {title, body, importance, category, subcategory, datetime, comment}= req.body;

    if (!uid) {
        return res.status(401).json({ success: false, message: 'Please log in' });
    }

    database.query('INSERT INTO notes (title, body, importance, category, subcategory, datetime, comment, uid) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [title, body, importance, category, subcategory, datetime, comment, uid], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Database error', error: err.message });
        }

        return res.json({ success: true, data: result, error: null });
    });
};
