import database from "../../database/database.js";

export const editExam = (req, res) => {

    const uid = req.userId;
    const {name, exam_date, status, day_left,  semester, year, id}= req.body;

    if (!uid) {
        return res.status(401).json({ success: false, message: 'Please log in' });
    }

    database.query('UPDATE exam_history SET name = ?, exam_date = ?, status = ?, day_left = ?, semester = ?, year = ?, uid =? WHERE id = ?', [name, exam_date, status, day_left,  semester, year, uid, id], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Database error', error: err.message });
        }

        return res.json({ success: true, data: result, error: null });
    });
};
