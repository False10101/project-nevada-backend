import database from "../../database/database.js";
import { format } from 'date-fns-tz';

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

        const adjustedResult = result.map(chore => ({
            ...chore,
            date_of_completion: format(new Date(chore.date_of_completion), 'yyyy-MM-dd', { timeZone: 'Asia/Bangkok' }),
            due_date: format(new Date(chore.due_date), 'yyyy-MM-dd', { timeZone: 'Asia/Bangkok' }),
        }));

        return res.json({ success: true, data: adjustedResult, error: null });
    });
};
