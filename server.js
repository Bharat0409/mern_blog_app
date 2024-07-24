import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import Connection from './database/db.js';
import Router from './routes/route.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', Router);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static("client/build"));
}

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const URL = process.env.MONGODB_URI || `mongodb://${USERNAME}:${PASSWORD}@ac-f2m0ruy-shard-00-00.rmvadp4.mongodb.net:27017,ac-f2m0ruy-shard-00-01.rmvadp4.mongodb.net:27017,ac-f2m0ruy-shard-00-02.rmvadp4.mongodb.net:27017/?ssl=true&replicaSet=atlas-oy4rcx-shard-0&authSource=admin&retryWrites=true&w=majority&appName=blog-api`;

Connection(URL);