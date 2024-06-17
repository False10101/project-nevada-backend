import database from "../../database/database.js";
import { format } from 'date-fns-tz';

export const getAllAssignments = (req, res) => {

    const uid = req.userId;

    if (!uid) {
        return res.status(401).json({ success: false, message: 'Please log in' });
    }


    const query = `
        SELECT *
        FROM assignments 
        WHERE uid = ?
    `;


    database.query(query, [uid], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Database error', error: err.message });
        }

        const adjustedResult = result.map(assignment => ({
            ...assignment,
            completion_date: format(new Date(assignment.completion_date), 'yyyy-MM-dd', { timeZone: 'Asia/Bangkok' }),
            due_date: format(new Date(assignment.due_date), 'yyyy-MM-dd', { timeZone: 'Asia/Bangkok' })
        }));

        return res.json({ success: true, data: adjustedResult, error: null });
    });
};
