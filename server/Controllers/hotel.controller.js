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
router.post('/hotel/search/:location', async (req, res) => {
  const { location, checkIn, checkOut, people } = req.body;
  try {
    const hotels = await Hotel.find({ location });
    const filteredHotels = hotels.filter((hotel) =>
      hotel.rooms.some((room) => {
        room.capacity >= people;
      })
    );
    res.json(filteredHotels);
  } catch (error) {
    res.status(500).json({ error: 'Error to fetching search result' });
  }
});
