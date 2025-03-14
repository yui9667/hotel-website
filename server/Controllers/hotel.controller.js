import Hotel from '../Models/hotel.model.js';
import express from 'express';
const router = express.Router();

//*Here is endpoint for hotel's information

//*Get all hotels
router.get('/hotels', async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//*Search hotel by amount of guests  (Used for search bar) Used post because it is more than one request
router.post('/hotel/search', async (req, res) => {
  const { location, checkIn, checkOut, people } = req.body;

  try {
    const hotels = await Hotel.find({ location });

    //*Calculate the price difference between weekdays and weekends
    const calculatePrice = (pricePerNight, checkIn, checkOut) => {
      const checkOutDate = new Date(checkOut);
      let totalDays = 0;
      let weekendDays = 0;

      //* Created loop to see everyday
      // for( let i= 0; arr.length < 0; i++)
      for (
        let checkInDate = new Date(checkIn);
        checkInDate < checkOutDate;
        checkInDate.setDate(checkInDate.getDate() + 1)
      ) {
        totalDays++;
        //*Check week. Sunday is 0 and Saturday is 6
        const dayOfWeek = checkInDate.getDay();
        //*Sunday is 0 and Saturday is 6
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          weekendDays++;
        }
      }
      //* weekdays
      const weekdayDays = totalDays - weekendDays;

      //*original price
      const weekdayRate = pricePerNight;
      //*Increase 20% on Weekend
      const weekendRate = weekdayRate * 1.2;
      const result = weekdayDays * weekdayRate + weekendDays * weekendRate;
      // console.log(
      //   `Total Days: ${totalDays}, Weekdays: ${weekdayDays}, Weekends: ${weekendDays}`
      // );
      //* 5% increases price by people
      const moreGuests = result * people;
      return moreGuests;
    };

    //* find the　specific rooms
    const hotelPrice = hotels.map((hotel) => {
      const roomNewPrice = hotel.rooms
        .filter((room) => {
          return room.capacity >= people;
        })
        .map((room) => ({
          //*Convert to JavaScript from Mongoose
          ...room.toObject(),
          adjustedPrice: calculatePrice(room.pricePerNight, checkIn, checkOut),
        }));
      //*Convert to JavaScript from Mongoose

      return { ...hotel.toObject(), rooms: roomNewPrice };
    });

    res.json(hotelPrice);
  } catch (error) {
    res.status(500).json({ error: 'Error to fetching search result' });
  }
});

export default router;
