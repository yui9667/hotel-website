import mongoose from 'mongoose';

const connectDB = async () => {
  try {
  } catch (error) {
    console.error('Error connecting to MongoDB: ', error.message);
  }
};

const hotelSchema = new mongoose.Schema({
  hotelName: {
    type: string,
    required: true,
  },
  location: {
    type: string,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: string,
    required: true,
  },
  rating: {
    type: number,
    default: 0,
  },
  amenities: [string],
  images: [string],
});

const hotel = mongoose.model('hotel', hotelSchema);
export default hotel;
