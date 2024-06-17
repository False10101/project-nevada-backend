import database from "../../database/database.js";
import { format } from 'date-fns-tz';

export const getAllEvents = (req, res) => {

    const {month, year} = req.params;
    const uid = req.userId;

    if (!uid) {
        return res.status(401).json({ success: false, message: 'Please log in' });
    }

    database.query('SELECT * FROM calendar_events WHERE uid = ? AND MONTH(date) = ? AND YEAR(date) = ?', [uid, month, year], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Database error', error: err.message });
        }

        const adjustedResult = result.map(event => ({
            ...event,
            date: format(new Date(event.date), 'yyyy-MM-dd', { timeZone: 'Asia/Bangkok' }),
        }));

        return res.json({ success: true, data: adjustedResult, error: null });
    });
};
