import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri = process.env.DATABASE.replace(
      '<db_password>',
      process.env.DATABASE_PASSWORD
    );
    if (!uri) throw new Error('MongoDB URI is not defined ');
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Could not connect to MongoDB:', error.message);
  }
};
export default connectDB;
