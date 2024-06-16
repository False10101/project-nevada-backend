import database from "../../../database/database.js";

export const addDebt = (req, res) => {
    const uid = req.userId;
    const type = "debt";
    const { amount, category, method, payment_time, debt_status, comment } = req.body;

    if (!uid) {
        return res.status(401).json({ success: false, message: 'Please log in' });
    }

    database.beginTransaction((err) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Database error', error: err.message });
        }

        const insertQuery = 'INSERT INTO expense_tracker (type, amount, category, method, payment_time, debt_status, comment, uid) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        database.query(insertQuery, [type, amount, category, method, payment_time, debt_status, comment, uid], (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return database.rollback(() => {
                    return res.status(500).json({ success: false, message: 'Database error', error: err.message });
                });
            }

            const selectQuery = 'SELECT total_debt FROM user_profile WHERE id = ?';
            database.query(selectQuery, [uid], (err, result) => {
                if (err) {
                    console.error('Database error:', err);
                    return database.rollback(() => {
                        return res.status(500).json({ success: false, message: 'Database error', error: err.message });
                    });
                }

                const oldTotalDebt = result[0].total_debt;
                const newTotalDebt = parseInt(oldTotalDebt) + parseInt(amount); 

                const updateQuery = 'UPDATE user_profile SET total_debt = ? WHERE id = ?';
                database.query(updateQuery, [newTotalDebt, uid], (err, updateResult) => {
                    if (err) {
                        console.error('Database error:', err);
                        return database.rollback(() => {
                            return res.status(500).json({ success: false, message: 'Database error', error: err.message });
                        });
                    }

                    database.commit((err) => {
                        if (err) {
                            console.error('Database error:', err);
                            return database.rollback(() => {
                                return res.status(500).json({ success: false, message: 'Database error', error: err.message });
                            });
                        }

                        return res.json({ success: true, data: updateResult, error: null });
                    });
                });
            });
        });
    });
};
