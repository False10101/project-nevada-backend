import database from "../../../database/database.js";

export const editExpense = (req, res) => {
    const uid = req.userId;
    const type = "expense";
    const { amount, category, method, payment_time, comment, id } = req.body;

    if (!uid) {
        return res.status(401).json({ success: false, message: 'Please log in' });
    }

    database.beginTransaction((err) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Database error', error: err.message });
        }

        const selectOldAmountQuery = 'SELECT amount FROM expense_tracker WHERE id = ? AND uid = ? AND type = ?';
        database.query(selectOldAmountQuery, [id, uid, type], (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return database.rollback(() => {
                    return res.status(500).json({ success: false, message: 'Database error', error: err.message });
                });
            }

            if (result.length === 0) {
                return res.status(404).json({ success: false, message: 'Expense not found or unauthorized' });
            }

            const oldAmount = result[0].amount;

            const updateExpenseQuery = 'UPDATE expense_tracker SET amount = ?, category = ?, method = ?, payment_time = ?, comment = ? WHERE id = ? AND uid = ? AND type = ?';
            database.query(updateExpenseQuery, [amount, category, method, payment_time, comment, id, uid, type], (err, result) => {
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
                    const newTotalMoneyLeft = parseInt(oldTotalMoneyLeft) + parseInt(oldAmount) - parseInt(amount);

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
    });
};
