import express from 'express';
import cookieParser from 'cookie-parser';
import { handleError } from './middlewares/error.js';
import cors from 'cors';

const app = express();

//middleware routes
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(handleError);





export default app;