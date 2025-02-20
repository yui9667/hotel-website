import dotenv from 'dotenv';
//* Keep it on the top since it gets an error if some codes are above it
dotenv.config({ path: './config.env' });
console.log('seeder.js', process.env.DATABASE);
import mongoose from 'mongoose';
import Hotel from './Models/hotel.model.js';
import connectDB from './Config/db.js';
//* Testing and setting up initial data

const seederHotels = async () => {
  const hotels = [
    {
      hotelName: 'Downtown Haven',
      location: 'Malmö',
      price: 800,
      description:
        'A modern hotel located in the heart of the city, offering easy access to shopping districts and cultural landmarks. Ideal for business and leisure travelers alike.',
      rating: 8.9,
      facilities: ['Wifi', 'Gym', 'Pool'],
      hotelImages: '/images/bank-hotel.jpg',
      rooms: [
        {
          roomType: 'Single',
          roomImages: '/images/one-bed.jpg',
          pricePerNight: 500,
          capacity: 1,
          description: 'Cozy single room with a queen-size bed.',
        },
        {
          roomType: 'Double',
          roomImages: '/images/king-bed.jpg',
          pricePerNight: 600,
          capacity: 2,
          description: 'Spacious double room with a kid-sized bed.',
        },
        {
          roomType: 'Twin',
          roomImages: '/images/twin-bed.jpg',
          pricePerNight: 800,
          capacity: 4,
          description: 'Two single beds for a comfortable stay',
        },
      ],
    },
    {
      hotelName: 'Skyline Retreat',
      location: 'Malmö',
      price: 700,
      description:
        'A chic, urban retreat with stunning views of the city skyline. Features a rooftop pool, fine dining, and modern.',
      rating: 8.2,
      facilities: ['Wifi', 'Car park', 'Sauna'],
      hotelImages: '/images/malmo-hotel.jpg',
      rooms: [
        {
          roomType: 'Single',
          roomImages: '/images/one-bed.jpg',
          pricePerNight: 700,
          capacity: 1,
          description: 'Cozy single room with a queen-size bed.',
        },
        {
          roomType: 'Double',
          roomImages: '/images/king-bed.jpg',
          pricePerNight: 800,
          capacity: 2,
          description: 'Spacious double room with a kid-sized bed.',
        },
        {
          roomType: 'Twin',
          roomImages: '/images/twin-bed.jpg',
          pricePerNight: 600,
          capacity: 4,
          description: 'Two single beds for a comfortable stay',
        },
      ],
    },
    {
      hotelName: 'City Lights Suites',
      location: 'Malmö',
      price: 400,
      description:
        'An upscale hotel with spacious suites and a vibrant atmosphere. Perfect for guests seeking comfort and convenience.',
      rating: 8.0,
      facilities: ['Wifi', 'Family room', 'Pool'],
      hotelImages: '/images/hotel-malmo.jpg',
      rooms: [
        {
          roomType: 'Single',
          roomImages: '/images/one-bed.jpg',
          pricePerNight: 400,
          capacity: 1,
          description: 'Cozy single room with a queen-size bed.',
        },
        {
          roomType: 'Double',
          roomImages: '/images/king-bed.jpg',
          pricePerNight: 500,
          capacity: 2,
          description: 'Spacious double room with a kid-sized bed.',
        },
        {
          roomType: 'Twin',
          roomImages: '/images/twin-bed.jpg',
          pricePerNight: 550,
          capacity: 4,
          description: 'Two single beds for a comfortable stay',
        },
      ],
    },
    {
      hotelName: 'Urban Bliss Inn',
      location: 'Malmö',
      price: 600,
      description:
        'A budget-friendly hotel that doesn’t compromise on quality. Enjoy cozy rooms, free WiFi, and complimentary breakfast.',
      rating: 8.2,
      facilities: ['Wifi', 'Breakfast ', 'Pool'],
      hotelImages: '/images/hotel2.jpg',
      rooms: [
        {
          roomType: 'Single',
          roomImages: '/images/king-bed.jpg',
          pricePerNight: 600,
          capacity: 1,
          description: 'Cozy single room with a queen-size bed.',
        },
        {
          roomType: 'Double',
          roomImages: '/images/room-dark.jpg',
          pricePerNight: 650,
          capacity: 2,
          description: 'Spacious double room with a kid-sized bed.',
        },
        {
          roomType: 'Twin',
          roomImages: '/images/twin-bed.jpg',
          pricePerNight: 700,
          capacity: 4,
          description: 'Two single beds for a comfortable stay',
        },
      ],
    },
    {
      hotelName: 'Central Luxe',
      location: 'Malmö',
      price: 400,
      description:
        'A luxury hotel known for its elegant interiors and personalized service. Offers exclusive spa treatments and a world-class restaurant.',
      rating: 9.2,
      facilities: ['Wifi', 'Restaurant', 'Spa'],
      hotelImages: '/images/gorgeous-hotel.jpg',
      rooms: [
        {
          roomType: 'Single',
          roomImages: '/images/room-gorgeous2.jpg',
          pricePerNight: 400,
          capacity: 1,
          description: 'Cozy single room with a queen-size bed.',
        },
        {
          roomType: 'Double',
          roomImages: '/images/room-dark.jpg',
          pricePerNight: 500,
          capacity: 2,
          description: 'Spacious double room with a kid-sized bed.',
        },
        {
          roomType: 'Twin',
          roomImages: '/images/twin-bed.jpg',
          pricePerNight: 550,
          capacity: 4,
          description: 'Two single beds for a comfortable stay',
        },
      ],
    },
    {
      hotelName: 'The Royal Plaza',
      location: 'Gothenburg',
      price: 600,
      description:
        'A grand hotel offering a taste of royalty. With opulent rooms and premium facilities, it’s the perfect getaway for those seeking luxury.',
      rating: 8.9,
      facilities: ['Wifi', 'Gym', 'Bar'],
      hotelImages: '/images/grandHotel.jpg',
      rooms: [
        {
          roomType: 'Single',
          roomImages: '/images/room-gorgeous.jpg',
          pricePerNight: 600,
          capacity: 1,
          description: 'Cozy single room with a queen-size bed.',
        },
        {
          roomType: 'Double',
          roomImages: '/images/room-gorgeous2.jpg',
          pricePerNight: 700,
          capacity: 2,
          description: 'Spacious double room with a kid-sized bed.',
        },
        {
          roomType: 'Twin',
          roomImages: '/images/twin-bed.jpg',
          pricePerNight: 750,
          capacity: 4,
          description: 'Two single beds for a comfortable stay',
        },
      ],
    },
    {
      hotelName: 'Golden Horizon',
      location: 'Gothenburg',
      price: 800,
      description:
        'A serene hotel located near the outskirts, offering breathtaking sunset views and tranquil surroundings.',
      rating: 9.0,
      facilities: ['Spa', 'Breakfast', 'Pool'],
      hotelImages: '/images/hotel-business.jpg',
      rooms: [
        {
          roomType: 'Single',
          roomImages: '/images/one-bed.jpg',
          pricePerNight: 800,
          capacity: 1,
          description: 'Cozy single room with a queen-size bed.',
        },
        {
          roomType: 'Double',
          roomImages: '/images/king-bed.jpg',
          pricePerNight: 820,
          capacity: 2,
          description: 'Spacious double room with a kid-sized bed.',
        },
        {
          roomType: 'Twin',
          roomImages: '/images/twin-bed.jpg',
          pricePerNight: 780,
          capacity: 4,
          description: 'Two single beds for a comfortable stay',
        },
      ],
    },
    {
      hotelName: 'Seaside Escape',
      location: 'Gothenburg',
      price: 600,
      description:
        'A coastal gem with beachfront access, water sports, and fresh seafood dining. Ideal for a relaxing getaway.',
      rating: 9.0,
      facilities: ['Wifi', 'Breakfast', 'Water sports'],
      hotelImages: '/images/hotel-pink.jpg',
      rooms: [
        {
          roomType: 'Single',
          roomImages: '/images/one-bed-room.jpg',
          pricePerNight: 600,
          capacity: 1,
          description: 'Cozy single room with a queen-size bed.',
        },
        {
          roomType: 'Double',
          roomImages: '/images/one-bed.jpg',
          pricePerNight: 700,
          capacity: 2,
          description: 'Spacious double room with a kid-sized bed.',
        },
        {
          roomType: 'Twin',
          roomImages: '/images/twin-bed.jpg',
          pricePerNight: 800,
          capacity: 4,
          description: 'Two single beds for a comfortable stay',
        },
      ],
    },
    {
      hotelName: 'Harbor Breeze Inn',
      location: 'Gothenburg',
      price: 700,
      description:
        'A charming boutique hotel overlooking the harbor. Features nautical-themed rooms and a cozy café.',
      rating: 8.8,
      facilities: ['Car parking ', 'Gym', 'Cafe'],
      hotelImages: '/images/hotel-cheap.jpg',
      rooms: [
        {
          roomType: 'Single',
          roomImages: '/images/room-dark.jpg',
          pricePerNight: 700,
          capacity: 1,
          description: 'Cozy single room with a queen-size bed.',
        },
        {
          roomType: 'Double',
          roomImages: '/images/room-gorgeous2.jpg',
          pricePerNight: 750,
          capacity: 2,
          description: 'Spacious double room with a kid-sized bed.',
        },
        {
          roomType: 'Twin',
          roomImages: '/images/twin-bed.jpg',
          pricePerNight: 800,
          capacity: 4,
          description: 'Two single beds for a comfortable stay',
        },
      ],
    },
    {
      hotelName: 'Crystal Waters Resort',
      location: 'Gothenburg',
      price: 450,
      description:
        'A sprawling resort with lush gardens, multiple pools, and family-friendly activities. A perfect destination for vacationers.',
      rating: 8.4,
      facilities: ['Wifi', 'Family room', 'Pool'],
      hotelImages: '/images/hotel-big.jpg',
      rooms: [
        {
          roomType: 'Single',
          pricePerNight: 450,
          roomImages: '/images/one-bed-room.jpg',
          capacity: 1,
          description: 'Cozy single room with a queen-size bed.',
        },
        {
          roomType: 'Double',
          roomImages: '/images/king-bed.jpg',
          pricePerNight: 550,
          capacity: 2,
          description: 'Spacious double room with a kid-sized bed.',
        },
        {
          roomType: 'Twin',
          roomImages: '/images/twin-bed.jpg',
          pricePerNight: 700,
          capacity: 4,
          description: 'Two single beds for a comfortable stay',
        },
      ],
    },
    {
      hotelName: 'Grand Oasis',
      location: 'Stockholm',
      price: 700,
      description:
        'A luxurious resort with sprawling gardens, infinity pools, and a private golf course. Ideal for romantic getaways.',
      rating: 9.5,
      facilities: ['Wifi', 'Golf', 'Pool'],
      hotelImages: '/images/hotel-gorgeous.jpg',
      rooms: [
        {
          roomType: 'Single',
          roomImages: '/images/room-gorgeous.jpg',
          pricePerNight: 700,
          capacity: 1,
          description: 'Cozy single room with a queen-size bed.',
        },
        {
          roomType: 'Double',
          roomImages: '/images/room-gorgeous2.jpg',
          pricePerNight: 750,
          capacity: 2,
          description: 'Spacious double room with a kid-sized bed.',
        },
        {
          roomType: 'Twin',
          roomImages: '/images/twin-bed.jpg',
          pricePerNight: 800,
          capacity: 4,
          description: 'Two single beds for a comfortable stay',
        },
      ],
    },
    {
      hotelName: 'Traveler’s Rest',
      location: 'Stockholm',
      price: 850,
      description:
        'A budget-friendly option for backpackers and solo travelers. Features clean rooms, free WiFi, and a 24/7 café.',
      rating: 8.1,
      facilities: ['Wifi', 'Cafe', 'Front desk[24-hour]'],
      hotelImages: '/images/hotel-stockholm.jpg',
      rooms: [
        {
          roomType: 'Single',
          roomImages: '/images/room-dark.jpg',
          pricePerNight: 850,
          capacity: 1,
          description: 'Cozy single room with a queen-size bed.',
        },
        {
          roomType: 'Double',
          roomImages: '/images/room-gorgeous2.jpg',
          pricePerNight: 900,
          capacity: 2,
          description: 'Spacious double room with a kid-sized bed.',
        },
        {
          roomType: 'Twin',
          roomImages: '/images/twin-bed.jpg',
          pricePerNight: 920,
          capacity: 4,
          description: 'Two single beds for a comfortable stay',
        },
      ],
    },
    {
      hotelName: 'Mountain View Lodge',
      location: 'Stockholm',
      price: 700,
      description:
        'Nestled in the hills, this lodge offers stunning views, cozy cabins, and adventurous hiking trails.',
      rating: 8.5,
      facilities: ['Wifi', 'Gym', 'Spa'],
      hotelImages: '/images/hotel-restaurant.jpg',
      rooms: [
        {
          roomType: 'Single',
          roomImages: '/images/one-bed-room.jpg',
          pricePerNight: 700,
          capacity: 1,
          description: 'Cozy single room with a queen-size bed.',
        },
        {
          roomType: 'Double',
          roomImages: '/images/king-bed.jpg',
          pricePerNight: 750,
          capacity: 2,
          description: 'Spacious double room with a kid-sized bed.',
        },
        {
          roomType: 'Twin',
          roomImages: '/images/twin-bed.jpg',
          pricePerNight: 820,
          capacity: 4,
          description: 'Two single beds for a comfortable stay',
        },
      ],
    },
    {
      hotelName: 'Aurora Suites',
      location: 'Stockholm',
      price: 900,
      description:
        'A boutique hotel known for its contemporary design and excellent service. Located near cultural hotspots.',
      rating: 8.9,
      facilities: ['Wifi', 'Gym', 'Hot springs'],
      hotelImages: '/images/hotel-look-cheap.jpg',
      rooms: [
        {
          roomType: 'Single',
          roomImages: '/images/one-bed.jpg',
          pricePerNight: 900,
          capacity: 1,
          description: 'Cozy single room with a queen-size bed.',
        },
        {
          roomType: 'Double',
          roomImages: '/images/king-bed.jpg',
          pricePerNight: 920,
          capacity: 2,
          description: 'Spacious double room with a kid-sized bed.',
        },
        {
          roomType: 'Twin',
          roomImages: '/images/twin-bed.jpg',
          pricePerNight: 970,
          capacity: 4,
          description: 'Two single beds for a comfortable stay',
        },
      ],
    },
    {
      hotelName: 'Cozy Corner Inn',
      location: 'Stockholm',
      price: 700,
      description:
        'A small, family-run inn offering a home-like atmosphere. Enjoy homemade breakfasts and warm hospitality.',
      rating: 7.9,
      facilities: ['Wifi', 'Family room', 'Breakfast'],
      hotelImages: '/images/hotel-sweden.jpg',
      rooms: [
        {
          roomType: 'Single',
          roomImages: '/images/one-bed.jpg',
          pricePerNight: 700,
          capacity: 1,
          description: 'Cozy single room with a queen-size bed.',
        },
        {
          roomType: 'Double',
          roomImages: '/images/one-bed-room.jpg',
          pricePerNight: 800,
          capacity: 2,
          description: 'Spacious double room with a kid-sized bed.',
        },
        {
          roomType: 'Twin',
          roomImages: '/images/twin-bed.jpg',
          pricePerNight: 850,
          capacity: 4,
          description: 'Two single beds for a comfortable stay',
        },
      ],
    },
  ];

  try {
    await connectDB();
    console.log('Database connected successfully');

    const deleted = await Hotel.deleteMany();
    console.log(
      `${deleted.deletedCount} hotels have been deleted from the database`
    );
    const result = await Hotel.insertMany(hotels);
    console.log(`${result.length} hotels have been added to the database`);
    mongoose.disconnect();
  } catch (error) {
    console.error('Error to seeding hotels:', error);
  } finally {
    mongoose.disconnect();
    console.log('Database disconnected!');
  }
};
seederHotels();
