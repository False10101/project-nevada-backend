import path from 'path';
import fs from 'fs';

const downloadAssignment = (req, res) => {
    const uid = req.userId;
    const { fileName } = req.params;
    const filePath = path.join('./uploads', fileName);

    if (!uid) {
        return res.status(401).json({ success: false, message: 'Please log in' });
    }

    if (fs.existsSync(filePath)) {
        res.download(filePath, fileName, (err) => {
            if (err) {
                console.error('Error downloading file:', err);
                return res.status(500).json({ success: false, message: 'Error downloading file', error: err.message });
            }
        });
    } else {
        return res.status(404).json({ success: false, message: 'File not found' });
    }
};

export default downloadAssignment;
