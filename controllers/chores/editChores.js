import database from "../../database/database.js";

export const editChore = (req, res) => {

    const uid = req.userId;
    const {name, by_whom, date_of_completion, day_calculation, status, due_date, comment, id}= req.body;

    if (!uid) {
        return res.status(401).json({ success: false, message: 'Please log in' });
    }

    database.query('UPDATE chores SET name = ?, by_whom = ?, date_of_completion = ?, day_calculation = ?, status = ?, due_date = ?, comment = ?, uid =? WHERE id = ?', [name, by_whom, date_of_completion, day_calculation, status, due_date, comment, uid, id], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Database error', error: err.message });
        }

        return res.json({ success: true, data: result, error: null });
    });
};
