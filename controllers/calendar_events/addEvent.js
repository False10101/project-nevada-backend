import database from "../../database/database.js";

export const addEvent = (req, res) => {

    const uid = req.userId;
    const {date, name, description, start_time,  end_time, status}= req.body;

    if (!uid) {
        return res.status(401).json({ success: false, message: 'Please log in' });
    }

    database.query('INSERT INTO calendar_events (date, name, description, start_time,  end_time, status, uid) VALUES (?, ?, ?, ?, ?, ?, ?)', [date, name, description, start_time,  end_time, status, uid], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Database error', error: err.message });
        }

        return res.json({ success: true, data: result, error: null });
    });
};
