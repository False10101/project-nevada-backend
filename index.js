import express from 'express';
import 'dotenv/config';
import database from './database/database.js';
import mainRouter from './router/mainRoute.js';
import './controllers/bots/testbot.js';
import cookieParser from 'cookie-parser';
import multer from 'multer';

const app = express();
const port = process.env.port || 3000;

app.use(express.json());

app.use(cookieParser());

database.connect((err) => {
	if (err) throw err;
	console.log('Database connected!');
});

app.use('/api', mainRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
