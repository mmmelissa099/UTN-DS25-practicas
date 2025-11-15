import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes

// GET all books
app.get('/api/books', async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching books' });
  }
});

// GET single book
app.get('/api/books/:id', async (req, res) => {
  try {
    const book = await prisma.book.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching book' });
  }
});

// POST create book
app.post('/api/books', async (req, res) => {
  try {
    const { title, author, year, genre, description } = req.body;
    
    const book = await prisma.book.create({
      data: {
        title,
        author,
        year: year ? parseInt(year) : null,
        genre,
        description
      }
    });
    
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: 'Error creating book' });
  }
});

// PUT update book
app.put('/api/books/:id', async (req, res) => {
  try {
    const { title, author, year, genre, description } = req.body;
    
    const book = await prisma.book.update({
      where: { id: parseInt(req.params.id) },
      data: {
        title,
        author,
        year: year ? parseInt(year) : null,
        genre,
        description
      }
    });
    
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Error updating book' });
  }
});

// DELETE book
app.delete('/api/books/:id', async (req, res) => {
  try {
    await prisma.book.delete({
      where: { id: parseInt(req.params.id) }
    });
    
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting book' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export { app, prisma };
