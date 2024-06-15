import database from "../../database/database.js";

export const editNote = (req, res) => {

    const uid = req.userId;
    const {title, body, importance, category, subcategory, datetime, id}= req.body;

    if (!uid) {
        return res.status(401).json({ success: false, message: 'Please log in' });
    }

    database.query('UPDATE notes SET title = ?, body = ?, importance = ?, category = ?, subcategory = ?, datetime = ?, uid =? WHERE id = ?', [title, body, importance, category, subcategory, datetime, uid, id], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Database error', error: err.message });
        }

        return res.json({ success: true, data: result, error: null });
    });
};
