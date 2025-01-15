import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const connectDB = async () => {
  try {
    const uri = process.env.DATABASE || 'http://localhost:27017/hotelDB';

    if (!uri) throw new Error('MongoDB URI is not defined ');
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Could not connect to MongoDB:', error.message);
  }
};
export default connectDB;
