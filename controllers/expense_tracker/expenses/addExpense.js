import database from "../../../database/database.js";

export const addExpense = (req, res) => {

    const uid = req.userId;
    const type = "expense";
    const { amount, category, method, payment_time, debt_status}= req.body;

    if (!uid) {
        return res.status(401).json({ success: false, message: 'Please log in' });
    }

    database.query('INSERT INTO expense_tracker (type, amount, category, method, payment_time, debt_status, uid) VALUES (?, ?, ?, ?, ?, ?, ?)', [type, amount, category, method, payment_time, debt_status, uid], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Database error', error: err.message });
        }

        return res.json({ success: true, data: result, error: null });
    });
};
