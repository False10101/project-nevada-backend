import database from "../../database/database.js";

export const addAssignment = (req, res) => {
    const uid = req.userId;
    const { name, completion_date, classname, status, due_date, comment } = req.body;

    if (!uid) {
        return res.status(401).json({ success: false, message: 'Please log in' });
    }

    const file = req.file ? req.file.filename : null;

    database.query(
        `INSERT INTO assignments (name, completion_date, classname, file, status, due_date, comment, uid) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, completion_date, classname, file, status, due_date, comment, uid],
        (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ success: false, message: 'Database error', error: err.message });
            }

            return res.json({ success: true, data: result, error: null });
        }
    );
};
