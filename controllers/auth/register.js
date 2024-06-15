import bcrypt from 'bcrypt';
import database from '../../database/database.js';

export const register = async (req, res) => {
	try {
		const { username, password, gmail, pin} = req.body;
		const [existingUser] = await database.promise().query(
			'SELECT * FROM `user_profile` WHERE username = ? OR gmail = ?',
			[username, gmail]
		);

		if (existingUser.length > 0) {
			return res.status(400).json({ success: false, payload: 'User already exists' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		await database.promise().query(
			'INSERT INTO `user_profile` (username, password, gmail, pin, total_money_left, total_debt) VALUES (?, ?, ?, ?, ?)',
			[username, hashedPassword, gmail, pin, 0, 0]
		);

		return res.status(200).json({ success: true, payload: 'Register successful' });
	} catch (error) {
		return res.status(400).json({ success: false, payload: error.message });
	}
};
