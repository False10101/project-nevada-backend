import database from "../../database/database.js";

export const editEvent = (req, res) => {

    const uid = req.userId;
    const {date, name, description, start_time,  end_time, status, id}= req.body;

    if (!uid) {
        return res.status(401).json({ success: false, message: 'Please log in' });
    }

    database.query('UPDATE calendar_events SET date = ?, name = ?, description = ?, start_time = ?, end_time = ?, status = ?, uid =? WHERE id = ?', [date, name, description, start_time,  end_time, status, uid, id], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Database error', error: err.message });
        }

        return res.json({ success: true, data: result, error: null });
    });
};
