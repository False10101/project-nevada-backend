import database from "../../../database/database.js";

export const editExpense = (req, res) => {

    const uid = req.userId;
    const type = "expense";
    const {amount, category, method, payment_time, debt_status, id}= req.body;

    if (!uid) {
        return res.status(401).json({ success: false, message: 'Please log in' });
    }

    database.query('UPDATE expense_tracker SET amount = ?, category = ?, method = ?, payment_time = ?, debt_status = ?, uid =? WHERE id = ? AND type = ?', [amount, category, method, payment_time, debt_status, uid, id, type], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Database error', error: err.message });
        }

        return res.json({ success: true, data: result, error: null });
    });
};
