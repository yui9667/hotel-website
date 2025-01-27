const express = require('express');
const router = express.Router();
const verifyToken = require('./authMiddleware.js');

router.get('/', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Protected route accessed' });
});
