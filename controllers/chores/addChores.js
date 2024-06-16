import database from "../../database/database.js";

export const addChore = (req, res) => {

    const uid = req.userId;
    const {name, by_whom, date_of_completion, day_calculation, status, due_date, comment}= req.body;

    if (!uid) {
        return res.status(401).json({ success: false, message: 'Please log in' });
    }

    database.query('INSERT INTO chores (name, by_whom, date_of_completion, day_calculation, status, due_date, comment, uid) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [name, by_whom, date_of_completion, day_calculation, status, due_date, comment, uid], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Database error', error: err.message });
        }

        return res.json({ success: true, data: result, error: null });
    });
};
