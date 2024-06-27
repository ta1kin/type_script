require('dotenv').config({ path: 'backend/.env' });

import express, { Request, Response } from 'express';
const path = require('path');
const userRouter = require('./routes/userRouter');

const PORT = Number(process.env.PORT || 5000);
const HOST = process.env.HOST || '127.0.0.1';
const MODE = process.env.MODE || 'alpha-version';

const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, '../frontend/dist')));
// app.use(userRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const start = () => {
    try {
        app.listen(PORT, HOST, () => {
            console.log(`Сервер работает по адресу: http://${HOST}:${PORT}`);
            console.log(`Проект на стадии: ${MODE}`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();