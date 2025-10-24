const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

const products = [
  {
    id: 1,
    name: 'Wireless Mouse',
    description: 'Smooth and responsive',
    price: 799,
    image: 'https://m.media-amazon.com/images/I/61LtuGzXeaL._SX679_.jpg'
  },
  {
    id: 2,
    name: 'Bluetooth Headphones',
    description: 'Noise-cancelling and comfy',
    price: 1499,
    image: 'https://m.media-amazon.com/images/I/71o8Q5XJS5L._SX679_.jpg'
  },
  {
    id: 3,
    name: 'Smart Watch',
    description: 'Track your fitness and time',
    price: 2499,
    image: 'https://m.media-amazon.com/images/I/71fwbMm1NBL._SX679_.jpg'
  }
];

app.get('/products', (req, res) => {
  res.status(200).json(products);
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});