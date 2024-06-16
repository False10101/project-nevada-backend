import database from "../../../database/database.js";

export const addExpense = (req, res) => {
    const uid = req.userId;
    const type = "expense";
    const { amount, category, method, payment_time, comment } = req.body;

    if (!uid) {
        return res.status(401).json({ success: false, message: 'Please log in' });
    }

    database.beginTransaction((err) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Database error', error: err.message });
        }

        const insertExpenseQuery = 'INSERT INTO expense_tracker (type, amount, category, method, payment_time, comment, uid) VALUES (?, ?, ?, ?, ?, ?, ?)';
        database.query(insertExpenseQuery, [type, amount, category, method, payment_time, comment, uid], (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return database.rollback(() => {
                    return res.status(500).json({ success: false, message: 'Database error', error: err.message });
                });
            }

            const selectTotalMoneyLeftQuery = 'SELECT total_money_left FROM user_profile WHERE id = ?';
            database.query(selectTotalMoneyLeftQuery, [uid], (err, result) => {
                if (err) {
                    console.error('Database error:', err);
                    return database.rollback(() => {
                        return res.status(500).json({ success: false, message: 'Database error', error: err.message });
                    });
                }

                const oldTotalMoneyLeft = result[0].total_money_left;
                const newTotalMoneyLeft = parseInt(oldTotalMoneyLeft) - parseInt(amount);

                const updateTotalMoneyLeftQuery = 'UPDATE user_profile SET total_money_left = ? WHERE id = ?';
                database.query(updateTotalMoneyLeftQuery, [newTotalMoneyLeft, uid], (err, result) => {
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

                        return res.json({ success: true, data: result, error: null });
                    });
                });
            });
        });
    });
};
