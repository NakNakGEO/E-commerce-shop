import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

let db;

async function initializeDatabase() {
  const dbPath = path.join(__dirname, '..', 'inventory.db');
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS inventory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      stock INTEGER NOT NULL,
      category TEXT NOT NULL,
      image TEXT NOT NULL
    )
  `);

  // Insert some sample data if the table is empty
  const count = await db.get('SELECT COUNT(*) as count FROM inventory');
  if (count.count === 0) {
    const sampleItems = [
      { name: 'Summer Dress', price: 49.99, stock: 100, category: 'Dresses', image: 'https://source.unsplash.com/400x600/?summer+dress' },
      { name: 'Denim Jeans', price: 59.99, stock: 150, category: 'Pants', image: 'https://source.unsplash.com/400x600/?denim+jeans' },
      { name: 'Floral Blouse', price: 39.99, stock: 80, category: 'Tops', image: 'https://source.unsplash.com/400x600/?floral+blouse' },
      { name: 'Leather Jacket', price: 99.99, stock: 50, category: 'Outerwear', image: 'https://source.unsplash.com/400x600/?leather+jacket' },
      { name: 'Sneakers', price: 79.99, stock: 120, category: 'Shoes', image: 'https://source.unsplash.com/400x600/?sneakers' },
    ];

    for (const item of sampleItems) {
      await db.run(
        'INSERT INTO inventory (name, price, stock, category, image) VALUES (?, ?, ?, ?, ?)',
        [item.name, item.price, item.stock, item.category, item.image]
      );
    }
  }
}

initializeDatabase().catch(console.error);

// Add a new route for image upload
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (req.file) {
    res.json({ imageUrl: `/uploads/${req.file.filename}` });
  } else {
    res.status(400).json({ error: 'No file uploaded' });
  }
});

// API routes
app.get('/api/clothing', async (req, res) => {
  try {
    const items = await db.all('SELECT * FROM inventory');
    res.json(items);
  } catch (error) {
    console.error('Error fetching clothing items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/inventory', async (req, res) => {
  try {
    const items = await db.all('SELECT * FROM inventory');
    res.json(items);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/inventory', async (req, res) => {
  const { name, price, stock, category, image } = req.body;
  try {
    const result = await db.run(
      'INSERT INTO inventory (name, price, stock, category, image) VALUES (?, ?, ?, ?, ?)',
      [name, price, stock, category, image]
    );
    res.status(201).json({ id: result.lastID, name, price, stock, category, image });
  } catch (error) {
    console.error('Error adding new item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/inventory/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, stock, category, image } = req.body;
  try {
    await db.run(
      'UPDATE inventory SET name = ?, price = ?, stock = ?, category = ?, image = ? WHERE id = ?',
      [name, price, stock, category, image, id]
    );
    res.json({ id, name, price, stock, category, image });
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/inventory/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.run('DELETE FROM inventory WHERE id = ?', id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});