import database from "../../database/database.js";

export const addExam = (req, res) => {

    const uid = req.userId;
    const {name, exam_date, status, day_left,  semester, year}= req.body;

    if (!uid) {
        return res.status(401).json({ success: false, message: 'Please log in' });
    }

    database.query('INSERT INTO exam_history (name, exam_date, status, day_left,  semester, year, uid) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, exam_date, status, day_left,  semester, year, uid], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Database error', error: err.message });
        }

        return res.json({ success: true, data: result, error: null });
    });
};
