import database from "../../database/database.js";

export const editAssignment = (req, res) => {

    const uid = req.userId;
    const {name, completion_date, classname, file,  status, due_date, id}= req.body;

    if (!uid) {
        return res.status(401).json({ success: false, message: 'Please log in' });
    }

    database.query('UPDATE assignments SET name = ?, completion_date = ?, classname = ?, file = ?, status = ?, due_date = ?, uid =? WHERE id = ?', [name, completion_date, classname, file,  status, due_date, uid, id], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Database error', error: err.message });
        }

        return res.json({ success: true, data: result, error: null });
    });
};
