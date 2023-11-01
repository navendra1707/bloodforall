import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

import userRoutes from './routes/user.js';

dotenv.config();
const app = express();

app.use(express.json()); 
app.use(helmet()); 
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); 
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use(userRoutes);

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to MongoDB")
    app.listen(process.env.PORT, () => {
        console.log("Server Started");
    })
}).catch(err => {
    console.error(err);
})