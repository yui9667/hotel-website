import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
import express from 'express';
import connectDB from './Config/db.js';
import hotelRouter from './Controllers/hotel.controller.js';
import userRouter from './Controllers/user.controller.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(
  '/images',
  express.static(path.join(__dirname, '../client/public/hotel-images-folder'))
);

const PORT = 3002;

app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);
connectDB();

app.use('/api', hotelRouter);
//*Start the server
app.use('/user', userRouter);

app.listen(PORT, () => {
  console.log(`PORT is running on${PORT}`);
});
