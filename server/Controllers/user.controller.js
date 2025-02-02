import express, { application } from 'express';
const router = express.Router();
import User from '../Models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//*Register
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: ' All field are required ' });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: 'Password must be at least 6 characters long' });
    }
    //* Check existing email or username

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already taken' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await user.save();
    console.log('User:', user);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Registration failed' });
  }
});

//*Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!email) {
      return res.status(401).json({ error: ' Authentication failed' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    const token = jwt.sign({ userId: user._id }, 'your-secret-key ', {
      expiresIn: '1h',
    });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Login failed' });
  }
});

//* Showing a user information to autofill in the confirm page
router.get('/info', async (req, res) => {
  try {
    //*GET does not have body. Use params or query
    const { firstName, lastName, email } = req.params;
    const userInfo = await User.findOne({ firstName, lastName, email });
    console.log(firstName, lastName, email);
    if (!userInfo) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(userInfo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to received ' });
  }
});

export default router;
