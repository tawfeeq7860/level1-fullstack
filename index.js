// Load environment variables
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Create express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample in-memory data (no database yet)
let products = [
  { id: 1, name: 'T-Shirt', price: 15.99 },
  { id: 2, name: 'Cap', price: 9.99 }
];

// --- CRUD Routes ---

// Read: get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Read: get single product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// Create: add new product
app.post('/api/products', (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Update: modify existing product
app.put('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  product.name = req.body.name ?? product.name;
  product.price = req.body.price ?? product.price;
  res.json(product);
});

// Delete: remove product
app.delete('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ message: 'Product not found' });
  products.splice(index, 1);
  res.json({ message: 'Deleted successfully' });
});
app.use(express.static('frontend'));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
