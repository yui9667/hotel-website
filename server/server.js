import express from 'express';
import mongoose from 'mongoose';
//import db from './Config/db';
import dotenv from 'dotenv';
import connectDB from './Config/db.js';
const app = express();
dotenv.config({ path: './config.env' });
connectDB();

//*Start the server
const PORT = 3002;

app.listen(PORT, () => {
  console.log(`PORT is running on${PORT}`);
});
