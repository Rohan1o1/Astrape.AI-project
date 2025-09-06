// Entry point for backend
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

// Routes
import authRoutes from './routes/auth.js';
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Astrape backend running');
});

import itemsRoutes from './routes/items.js';
app.use('/api/items', itemsRoutes);
import cartRoutes from './routes/cart.js';
app.use('/api/cart', cartRoutes);

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/astrape', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => console.error('MongoDB connection error:', err));
