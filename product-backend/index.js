// index.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: 'Siddhi@123', // Replace with your MySQL password
  database: 'productsdb' // Replace with your database name
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
  
  // Create table if it doesn't exist
  const createTable = `
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      category VARCHAR(255) NOT NULL,
      color VARCHAR(255) NOT NULL,
      size VARCHAR(255) NOT NULL,
      imageSrc TEXT NOT NULL,
      imageAlt TEXT NOT NULL,
      href TEXT NOT NULL
    )
  `;
  
  db.query(createTable, (err) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Table created.');
    }
  });

  // Remove dummy data insertion logic
});

// API route for getting products
app.get('/api/products', (req, res) => {
  const { search } = req.query;
  let sql = 'SELECT * FROM productsdb.products';
  if (search) {
    sql += ' WHERE name LIKE ?';
  }
  db.query(sql, search ? [`%${search}%`] : [], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

// Create a product
app.post('/api/products', (req, res) => {
  const { name, price, category, color, size, imageSrc, imageAlt, href } = req.body;
  const sql = 'INSERT INTO productsdb.products (name, price, category, color, size, imageSrc, imageAlt, href) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [name, price, category, color, size, imageSrc, imageAlt, href], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ message: 'Product created', id: result.insertId });
    }
  });
});

// Read a single product
app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM productsdb.products WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(result);
    }
  });
});

// Update a product
app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, price, category, color, size, imageSrc, imageAlt, href } = req.body;
  const sql = 'UPDATE productsdb.products SET name = ?, price = ?, category = ?, color = ?, size = ?, imageSrc = ?, imageAlt = ?, href = ? WHERE id = ?';
  db.query(sql, [name, price, category, color, size, imageSrc, imageAlt, href, id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Product updated' });
    }
  });
});

// Delete a product
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM productsdb.products WHERE id = ?';
  db.query(sql, [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Product deleted' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
