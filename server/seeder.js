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
      price: 1300,
      description:
        'A modern hotel located in the heart of the city, offering easy access to shopping districts and cultural landmarks. Ideal for business and leisure travelers alike.',
      rating: 8.9,
      amenities: ['Wifi', 'Gym', 'Pool'],
      images: '',
      rooms: [
        {
          roomType: 'Single',
          pricePerNight: 800,
          capacity: 1,
          description: 'Cozy single room with a queen-size bed.',
        },
        {
          roomType: 'Double',
          pricePerNight: 1500,
          capacity: 2,
          description: 'Spacious double room with a kid-sized bed.',
        },
        {
          roomType: 'Twin',
          pricePerNight: 1800,
          capacity: 2,
          description: 'Two single beds for a comfortable stay',
        },
      ],
    },
    {
      hotelName: 'Skyline Retreat',
      location: 'Malmö',
      price: 1100,
      description:
        'A chic, urban retreat with stunning views of the city skyline. Features a rooftop pool, fine dining, and modern amenities.',
      rating: 8.2,
      amenities: ['Wifi', 'Car park', 'Sauna'],
      images: '',
      rooms: [
        {
          roomType: 'Single',
          pricePerNight: 700,
          capacity: 1,
          description: 'Cozy single room with a queen-size bed.',
        },
        {
          roomType: 'Double',
          pricePerNight: 1300,
          capacity: 2,
          description: 'Spacious double room with a kid-sized bed.',
        },
        {
          roomType: 'Twin',
          pricePerNight: 1500,
          capacity: 2,
          description: 'Two single beds for a comfortable stay',
        },
      ],
    },
    {
      hotelName: 'City Lights Suites',
      location: 'Malmö',
      price: 1200,
      description:
        'An upscale hotel with spacious suites and a vibrant atmosphere. Perfect for guests seeking comfort and convenience.',
      rating: 8.0,
      amenities: ['Wifi', 'Family room', 'Pool'],
      images: '',
      rooms: [
        {
          roomType: 'Single',
          pricePerNight: 500,
          capacity: 1,
          description: 'Cozy single room with a queen-size bed.',
        },
        {
          roomType: 'Double',
          pricePerNight: 1100,
          capacity: 2,
          description: 'Spacious double room with a kid-sized bed.',
        },
        {
          roomType: 'Twin',
          pricePerNight: 1000,
          capacity: 2,
          description: 'Two single beds for a comfortable stay',
        },
      ],
    },
    {
      hotelName: 'Urban Bliss Inn',
      location: 'Malmö',
      price: 1400,
      description:
        'A budget-friendly hotel that doesn’t compromise on quality. Enjoy cozy rooms, free WiFi, and complimentary breakfast.',
      rating: 7.8,
      amenities: ['Wifi', 'Breakfast ', 'Pool'],
      images: '',
      rooms: [
        {
          roomType: 'Single',
          pricePerNight: 1000,
          capacity: 1,
          description: 'Cozy single room with a queen-size bed.',
        },
        {
          roomType: 'Double',
          pricePerNight: 1200,
          capacity: 2,
          description: 'Spacious double room with a kid-sized bed.',
        },
        {
          roomType: 'Twin',
          pricePerNight: 1200,
          capacity: 2,
          description: 'Two single beds for a comfortable stay',
        },
      ],
    },
    {
      hotelName: 'Central Luxe',
      location: 'Malmö',
      price: 2000,
      description:
        'A luxury hotel known for its elegant interiors and personalized service. Offers exclusive spa treatments and a world-class restaurant.',
      rating: 9.2,
      amenities: ['Wifi', 'Restaurant', 'Spa'],
      images: '',
      rooms: [
        {
          roomType: 'Single',
          pricePerNight: 1500,
          capacity: 1,
          description: 'Cozy single room with a queen-size bed.',
        },
        {
          roomType: 'Double',
          pricePerNight: 2100,
          capacity: 2,
          description: 'Spacious double room with a kid-sized bed.',
        },
        {
          roomType: 'Twin',
          pricePerNight: 2500,
          capacity: 2,
          description: 'Two single beds for a comfortable stay',
        },
      ],
    },
    {
      hotelName: 'The Royal Plaza',
      location: 'Gothenburg',
      price: 2500,
      description:
        'A grand hotel offering a taste of royalty. With opulent rooms and premium facilities, it’s the perfect getaway for those seeking luxury.',
      rating: 8.9,
      amenities: ['Wifi', 'Gym', 'Bar'],
      images: '',
      rooms: [
        {
          roomType: 'Single',
          pricePerNight: 2100,
          capacity: 1,
          description: 'Cozy single room with a queen-size bed.',
        },
        {
          roomType: 'Double',
          pricePerNight: 2600,
          capacity: 2,
          description: 'Spacious double room with a kid-sized bed.',
        },
        {
          roomType: 'Twin',
          pricePerNight: 2500,
          capacity: 2,
          description: 'Two single beds for a comfortable stay',
        },
      ],
    },
    {
      hotelName: 'Golden Horizon',
      location: 'Gothenburg',
      price: 2100,
      description:
        'A serene hotel located near the outskirts, offering breathtaking sunset views and tranquil surroundings.',
      rating: 9.0,
      amenities: ['Spa', 'Breakfast', 'Pool'],
      images: '',
      rooms: [
        {
          roomType: 'Single',
          pricePerNight: 2100,
          capacity: 1,
          description: 'Cozy single room with a queen-size bed.',
        },
        {
          roomType: 'Double',
          pricePerNight: 2600,
          capacity: 2,
          description: 'Spacious double room with a kid-sized bed.',
        },
        {
          roomType: 'Twin',
          pricePerNight: 2700,
          capacity: 2,
          description: 'Two single beds for a comfortable stay',
        },
      ],
    },
    {
      hotelName: 'Seaside Escape',
      location: 'Gothenburg',
      price: 2500,
      description:
        'A coastal gem with beachfront access, water sports, and fresh seafood dining. Ideal for a relaxing getaway.',
      rating: 9.0,
      amenities: ['Wifi', 'Breakfast', 'Water sports'],
      images: '',
      rooms: [
        {
          roomType: 'Single',
          pricePerNight: 2000,
          capacity: 1,
          description: 'Cozy single room with a queen-size bed.',
        },
        {
          roomType: 'Double',
          pricePerNight: 2600,
          capacity: 2,
          description: 'Spacious double room with a kid-sized bed.',
        },
        {
          roomType: 'Twin',
          pricePerNight: 3000,
          capacity: 2,
          description: 'Two single beds for a comfortable stay',
        },
      ],
    },
    {
      hotelName: 'Harbor Breeze Inn',
      location: 'Gothenburg',
      price: 1300,
      description:
        'A charming boutique hotel overlooking the harbor. Features nautical-themed rooms and a cozy café.',
      rating: 8.8,
      amenities: ['Car parking ', 'Gym', 'Cafe'],
      images: '',
      rooms: [
        {
          roomType: 'Single',
          pricePerNight: 2600,
          capacity: 1,
          description: 'Cozy single room with a queen-size bed.',
        },
        {
          roomType: 'Double',
          pricePerNight: 3000,
          capacity: 2,
          description: 'Spacious double room with a kid-sized bed.',
        },
        {
          roomType: 'Twin',
          pricePerNight: 3200,
          capacity: 2,
          description: 'Two single beds for a comfortable stay',
        },
      ],
    },
    {
      hotelName: 'Crystal Waters Resort',
      location: 'Gothenburg',
      price: 2600,
      description:
        'A sprawling resort with lush gardens, multiple pools, and family-friendly activities. A perfect destination for vacationers.',
      rating: 8.4,
      amenities: ['Wifi', 'Family room', 'Pool'],
      images: '',
      rooms: [
        {
          roomType: 'Single',
          pricePerNight: 2100,
          capacity: 1,
          description: 'Cozy single room with a queen-size bed.',
        },
        {
          roomType: 'Double',
          pricePerNight: 2500,
          capacity: 2,
          description: 'Spacious double room with a kid-sized bed.',
        },
        {
          roomType: 'Twin',
          pricePerNight: 2800,
          capacity: 2,
          description: 'Two single beds for a comfortable stay',
        },
      ],
    },
    {
      hotelName: 'Grand Oasis',
      location: 'Stockholm',
      price: 3000,
      description:
        'A luxurious resort with sprawling gardens, infinity pools, and a private golf course. Ideal for romantic getaways.',
      rating: 9.5,
      amenities: ['Wifi', 'Golf', 'Pool'],
      images: '',
      rooms: [
        {
          roomType: 'Single',
          pricePerNight: 2900,
          capacity: 1,
          description: 'Cozy single room with a queen-size bed.',
        },
        {
          roomType: 'Double',
          pricePerNight: 3200,
          capacity: 2,
          description: 'Spacious double room with a kid-sized bed.',
        },
        {
          roomType: 'Twin',
          pricePerNight: 3300,
          capacity: 2,
          description: 'Two single beds for a comfortable stay',
        },
      ],
    },
    {
      hotelName: 'Traveler’s Rest',
      location: 'Stockholm',
      price: 2500,
      description:
        'A budget-friendly option for backpackers and solo travelers. Features clean rooms, free WiFi, and a 24/7 café.',
      rating: 8.1,
      amenities: ['Wifi', 'Cafe', 'Front desk[24-hour]'],
      images: '',
      rooms: [
        {
          roomType: 'Single',
          pricePerNight: 2100,
          capacity: 1,
          description: 'Cozy single room with a queen-size bed.',
        },
        {
          roomType: 'Double',
          pricePerNight: 2800,
          capacity: 2,
          description: 'Spacious double room with a kid-sized bed.',
        },
        {
          roomType: 'Twin',
          pricePerNight: 2900,
          capacity: 2,
          description: 'Two single beds for a comfortable stay',
        },
      ],
    },
    {
      hotelName: 'Mountain View Lodge',
      location: 'Stockholm',
      price: 2500,
      description:
        'Nestled in the hills, this lodge offers stunning views, cozy cabins, and adventurous hiking trails.',
      rating: 8.5,
      amenities: ['Wifi', 'Gym', 'Spa'],
      images: '',
      rooms: [
        {
          roomType: 'Single',
          pricePerNight: 2500,
          capacity: 1,
          description: 'Cozy single room with a queen-size bed.',
        },
        {
          roomType: 'Double',
          pricePerNight: 2800,
          capacity: 2,
          description: 'Spacious double room with a kid-sized bed.',
        },
        {
          roomType: 'Twin',
          pricePerNight: 3000,
          capacity: 2,
          description: 'Two single beds for a comfortable stay',
        },
      ],
    },
    {
      hotelName: 'Aurora Suites',
      location: 'Stockholm',
      price: 2500,
      description:
        'A boutique hotel known for its contemporary design and excellent service. Located near cultural hotspots.',
      rating: 8.9,
      amenities: ['Wifi', 'Gym', 'Hot springs'],
      images: '',
      rooms: [
        {
          roomType: 'Single',
          pricePerNight: 2500,
          capacity: 1,
          description: 'Cozy single room with a queen-size bed.',
        },
        {
          roomType: 'Double',
          pricePerNight: 2900,
          capacity: 2,
          description: 'Spacious double room with a kid-sized bed.',
        },
        {
          roomType: 'Twin',
          pricePerNight: 3100,
          capacity: 2,
          description: 'Two single beds for a comfortable stay',
        },
      ],
    },
    {
      hotelName: 'Cozy Corner Inn',
      location: 'Stockholm',
      price: 1300,
      description:
        'A small, family-run inn offering a home-like atmosphere. Enjoy homemade breakfasts and warm hospitality.',
      rating: 7.9,
      amenities: ['Wifi', 'Family room', 'Breakfast'],
      images: '',
      rooms: [
        {
          roomType: 'Single',
          pricePerNight: 2500,
          capacity: 1,
          description: 'Cozy single room with a queen-size bed.',
        },
        {
          roomType: 'Double',
          pricePerNight: 2900,
          capacity: 2,
          description: 'Spacious double room with a kid-sized bed.',
        },
        {
          roomType: 'Twin',
          pricePerNight: 3000,
          capacity: 2,
          description: 'Two single beds for a comfortable stay',
        },
      ],
    },
  ];

  try {
    //     await Hotel.deleteMany();
    await connectDB();
    const result = await Hotel.insertMany(hotels);
    console.log(`${result.length} hotels have been added to the database`);
    mongoose.disconnect();
  } catch (error) {
    console.error('Error to seeding hotels:', error);
    mongoose.disconnect();
  }
};
seederHotels();
