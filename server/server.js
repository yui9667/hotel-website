import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
import express from 'express';
import connectDB from './Config/db.js';
import hotelRouter from './Controllers/hotel.controller.js';
import userRouter from './Controllers/user.controller.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(
  '/images',
  express.static(path.join(__dirname, '../client/public/hotel-images-folder'))
);

const PORT = 3002;

app.use(express.json());
app.use(express.static('public'));
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);
connectDB();

app.use('/api', hotelRouter);
//*Start the server
app.use('/user', userRouter);
//*Check Out  Stripe
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { hotelData, selectedRoom } = req.body;

    console.log('selectedRoom', selectedRoom);
    //console.log(hotelData);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'sek',
            unit_amount: selectedRoom.adjustedPrice * 100,
            product_data: {
              name: `${hotelData.hotelName} - ${selectedRoom.roomType}`,
              images: [
                `https://fff9-83-233-244-217.ngrok-free.app${hotelData.hotelImages}`,
              ],
              description: `This room accommodates up to ${selectedRoom.capacity} people. 
                This is test mode. Please enter a test card number "4242 4242 4242" `,
            },
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/canceled',
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.listen(PORT, () => {
  console.log(`PORT is running on${PORT}`);
});
