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
  facilities: [String],
  hotelImages: { type: String, required: false },
  rooms: [
    {
      roomType: { type: String, required: true },
      pricePerNight: { type: Number, required: true },
      capacity: { type: Number, required: true },
      description: String,
      roomImages: { type: String },
    },
  ],
});

const Hotel = mongoose.model('Hotel', hotelSchema);
export default Hotel;
