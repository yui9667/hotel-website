import Hotel from '../Models/hotel.model.js';
import express from 'express';
import db from '../Config/db.js';
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

//*specific hotel
router.get('/hotel/:id', async (req, res) => {
  const { id } = req.params;
  const hotel = await Hotel.findById(id);
  if (!hotel) {
    return res.status(404).send({ error: 'Hotel not found' });
  }
  res.send(hotel);
});

//*Select specific a city
router.get('/hotel/location/:location', async (req, res) => {
  const { location } = req.params;
  const hotels = await Hotel.find();
  const findLocation = hotels.filter((hotel) => hotel.location === location);
  if (findLocation.length > 0) {
    return res.json(findLocation);
  } else {
    return res
      .status(404)
      .json({ error: ` There are no hotels in ${location}` });
  }
});
export default router;

//*Search hotel by amount of guests  (Used for search bar) Used post because it is more than one request
router.post('/hotel/search', async (req, res) => {
  const { location, checkIn, checkOut, people } = req.body;
  try {
    const hotels = await Hotel.find({ location });
    //*Calculate the price difference between weekdays and weekends
    const calculatePrice = (pricePerNight, checkIn, checkOut) => {
      const checkIn = new Date(checkIn);
      const checkOut = new Date(checkOut);
      let totalDays = 0;
      let weekendDays = 0;

      //* Created loop to see everyday
      // for( let i= 0; arr.length < 0; i++)
      for (
        let date = new Date(checkIn);
        date < checkOut;
        date.setDate(date.getDate() + 1)
      )
        totalDays++;
      //*Check week. Sunday is 0 and Saturday is 6
      const dayOfWeek = data.getDate();

      if (dayOfWeek === 0 || dayOfWeek === 6) {
        weekendDays++;
      }
      //* weekdays
      const weekdayDays = totalDays - weekendDays;
      //*original price
      const weekdayRate = pricePerNight;
      //*Increase 20% on Weekend
      const weekendRate = weekdayRate * 1.2;
      return weekdayDays * weekdayRate + weekdayDays * weekendRate;
    };

    //* find the　specific rooms
    const hotelPrice = hotels.map((hotel) => {
      const roomNewPrice = hotel.rooms
        .filter((room) => {
          room.capacity >= people;
        })
        .map((room) => ({
          ...room.toObject(),
          adjustedPrice: calculatePrice(room.pricePerNight, checkIn, checkOut),
        }));
      return { ...hotel.toObject(), rooms: roomNewPrice };
    });
    res.json(hotelPrice);
  } catch (error) {
    res.status(500).json({ error: 'Error to fetching search result' });
  }
});
