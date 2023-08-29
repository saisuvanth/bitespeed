import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { pool } from './db';
import { IdentifyReqDTO, IdentifyResponseDTO } from './types';
import { UserRepository } from './repository/user.repo';
import userRouter from './routes/user.route';

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(userRouter);



app.listen(process.env.PORT, () => console.log(`listening to ${process.env.PORT}`));