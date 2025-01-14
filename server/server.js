import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
import express from 'express';
import mongoose from 'mongoose';
//import db from './Config/db';
import connectDB from './Config/db.js';
import cors from 'cors';
const app = express();
connectDB();

//*Start the server
const PORT = 3002;

app.listen(PORT, () => {
  console.log(`PORT is running on${PORT}`);
});
