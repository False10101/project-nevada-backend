import database from "../../../database/database.js";

export const removeExpense = (req, res) => {

    const uid = req.userId;
    const {id}= req.body;
    const type = "expense";

    if (!uid) {
        return res.status(401).json({ success: false, message: 'Please log in' });
    }

    database.query('DELETE from expense_tracker WHERE id = ? and uid = ? and type = ?', [id, uid, type], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Database error', error: err.message });
        }

        return res.json({ success: true, data: result, error: null });
    });
};