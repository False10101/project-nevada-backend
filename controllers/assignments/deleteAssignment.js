// addAssignment.js
import database from "../../database/database.js";
import fs from 'fs'; // Node.js filesystem module
import path from 'path'; // Node.js path module

export const deleteAssignments = (req, res) => {
    const uid = req.userId;
    const { id } = req.body;

    if (!uid) {
        return res.status(401).json({ success: false, message: 'Please log in' });
    }

    database.query('SELECT file FROM assignments WHERE id = ? AND uid = ?', [id, uid], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Database error', error: err.message });
        }

        if (result.length === 0) {
            return res.status(404).json({ success: false, message: 'Assignment not found or unauthorized' });
        }

        const file = result[0].file;

        database.query('DELETE FROM assignments WHERE id = ? AND uid = ?', [id, uid], (err, deleteResult) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ success: false, message: 'Database error', error: err.message });
            }

            if (file) {
                const filePath = path.join('./uploads', file);

                fs.stat(filePath, (err, stats) => {
                    if (err) {
                        console.error('File not found:', err);
                    } else {
                        fs.unlink(filePath, (err) => {
                            if (err) {
                                console.error('Error deleting file:', err);
                            }
                        });
                    }
                });
            }

            return res.json({ success: true, data: deleteResult, error: null });
        });
    });
};
