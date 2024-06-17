import database from "../../../database/database.js";
import { format } from 'date-fns-tz';

export const getAllExpense = (req, res) => {

    const uid = req.userId;
    const type = "expense";

    if (!uid) {
        return res.status(401).json({ success: false, message: 'Please log in' });
    }

    database.query('SELECT * FROM expense_tracker WHERE uid = ? AND type = ?', [uid, type], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Database error', error: err.message });
        }

        const adjustedResult = result.map(expense => ({
            ...expense,
            payment_time: format(new Date(expense.payment_time), 'yyyy-MM-dd HH:mm:ss', { timeZone: 'Asia/Bangkok' }),
        }));

        return res.json({ success: true, data: adjustedResult, error: null });
    });
};
