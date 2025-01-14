import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  hotelName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  amenities: [String],
  images: [String],
  rooms: [
    {
      roomType: { type: String, required: true },
      pricePerNight: { type: Number, required: true },
      availability: { type: Boolean, default: true },
      capacity: { type: Number, required: true },
      description: String,
    },
  ],
});

const Hotel = mongoose.model('Hotel', hotelSchema);
export default Hotel;
