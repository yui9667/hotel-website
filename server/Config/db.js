import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const connectDB = async () => {
  try {
    const uri = process.env.DATABASE;
    console.log('db.js', process.env.DATABASE); // This should output your MongoDB URI

    if (!uri) throw new Error('MongoDB URI is not defined ');
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Could not connect to MongoDB:', error.message);
  }
};
export default connectDB;
