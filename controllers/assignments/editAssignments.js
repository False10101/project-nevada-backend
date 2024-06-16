import database from "../../database/database.js";
import fs from 'fs';
import path from 'path';
import upload from '../../middleware/uploadMiddlewares.js'; // Ensure correct import path for multer middleware
import multer from 'multer';

export const editAssignment = (req, res) => {
    const uid = req.userId;
    const { name, completion_date, classname, status, due_date, id } = req.body;

    if (!uid) {
        return res.status(401).json({ success: false, message: 'Please log in' });
    }

    database.query('SELECT * FROM assignments WHERE id = ? AND uid = ?', [id, uid], (err, assignments) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Database error', error: err.message });
        }

        if (assignments.length === 0) {
            return res.status(404).json({ success: false, message: 'Assignment not found or unauthorized' });
        }

        const oldAssignment = assignments[0];
        const oldFileName = oldAssignment.file;

        // Prepare new file name from request if available
        const newFileName = req.file ? req.file.filename : oldFileName;

        database.query(
            'UPDATE assignments SET name = ?, completion_date = ?, classname = ?, file = ?, status = ?, due_date = ? WHERE id = ? AND uid = ?',
            [name, completion_date, classname, newFileName, status, due_date, id, uid],
            (err, result) => {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({ success: false, message: 'Database error', error: err.message });
                }

                // Remove old upload if file has changed
                if (oldFileName && newFileName && oldFileName !== newFileName) {
                    const filePath = path.join('./uploads', oldFileName);
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error('Error deleting old file:', err);
                        }
                    });
                }

                return res.json({ success: true, data: result, error: null });
            }
        );
    });
};
