import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Item from './models/Item.js';

dotenv.config();

const items = [
  // Sport
  { name: 'Smart Watch WH22-6 Fitness', price: 454.00, category: 'Sport', brand: 'Xiaomi', image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=400&q=80', rating: 4.5, isTopItem: true },
  { name: 'Tennis Rackets for Beginners', price: 30.99, category: 'Sport', brand: 'Adidas', image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&q=80', rating: 4.2 },
  { name: 'Premium Boxing Gloves', price: 196.84, category: 'Sport', brand: 'Nike', image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80', rating: 4.7 },
  { name: 'Club Kit 1 Recurve Archery', price: 48.99, category: 'Sport', brand: 'Demix', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80', rating: 4.0 },
  { name: 'Mountain Bike Helmet', price: 89.99, category: 'Sport', brand: 'Columbia', image: 'https://images.unsplash.com/photo-1518655048521-f130df041f66?auto=format&fit=crop&w=400&q=80', rating: 4.4 },
  { name: 'Running Shoes', price: 120.00, category: 'Sport', brand: 'Asics', image: 'https://images.unsplash.com/photo-1515548212235-6b2c6c7bfa98?auto=format&fit=crop&w=400&q=80', rating: 4.6 },
  // Fashion
  { name: 'Nike White Therma-Fit Pullover Training Hoodie', price: 154.99, category: 'Fashion', brand: 'Nike', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80', rating: 4.6, isTopItem: true },
  { name: 'Lightweight White Nike Trainers', price: 210.00, category: 'Fashion', brand: 'Nike', image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80', rating: 4.8, isTopItem: true },
  { name: 'Adidas Originals Cap', price: 29.99, category: 'Fashion', brand: 'Adidas', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80', rating: 4.3 },
  { name: 'Columbia Men’s Jacket', price: 120.00, category: 'Fashion', brand: 'Columbia', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80', rating: 4.4 },
  { name: 'Classic Blue Jeans', price: 60.00, category: 'Fashion', brand: 'Demix', image: 'https://images.unsplash.com/photo-1514995669114-d1c1b7a83a48?auto=format&fit=crop&w=400&q=80', rating: 4.2 },
  { name: 'Summer Dress', price: 80.00, category: 'Fashion', brand: 'New Balance', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80', rating: 4.5 },
  // Home
  { name: 'Minimalist Table Lamp', price: 45.00, category: 'Home', brand: 'Xiaomi', image: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=400&q=80', rating: 4.1 },
  { name: 'Modern Wall Clock', price: 35.00, category: 'Home', brand: 'Demix', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80', rating: 4.0 },
  { name: 'Artistic Vase', price: 60.00, category: 'Home', brand: 'New Balance', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', rating: 4.2 },
  { name: 'Cozy Throw Blanket', price: 38.00, category: 'Home', brand: 'Columbia', image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', rating: 4.3 },
  { name: 'Decorative Pillow Set', price: 25.00, category: 'Home', brand: 'Nike', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80', rating: 4.4 },
  // Art
  { name: 'Abstract Canvas Painting', price: 300.00, category: 'Art', brand: 'Asics', image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80', rating: 4.7 },
  { name: 'Sculpture Decor', price: 180.00, category: 'Art', brand: 'Columbia', image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', rating: 4.5 },
  { name: 'Modern Wall Art', price: 120.00, category: 'Art', brand: 'Demix', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80', rating: 4.6 },
  { name: 'Handmade Pottery', price: 90.00, category: 'Art', brand: 'Adidas', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', rating: 4.4 },
  // Crypto
  { name: 'Crypto Hardware Wallet', price: 99.00, category: 'Crypto', brand: 'Xiaomi', image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308', rating: 4.6 },
  { name: 'Bitcoin T-shirt', price: 25.00, category: 'Crypto', brand: 'Nike', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f', rating: 4.2 },
  { name: 'Ethereum Mug', price: 18.00, category: 'Crypto', brand: 'Columbia', image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99', rating: 4.3 },
  { name: 'Crypto Socks', price: 12.00, category: 'Crypto', brand: 'Demix', image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2', rating: 4.1 },
  // Health & Wellness
  { name: 'Yoga Mat', price: 35.00, category: 'Health & Wellness', brand: 'Adidas', image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c', rating: 4.8 },
  { name: 'Protein Shaker Bottle', price: 15.00, category: 'Health & Wellness', brand: 'Demix', image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b', rating: 4.3 },
  { name: 'Massage Roller', price: 22.00, category: 'Health & Wellness', brand: 'Nike', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9', rating: 4.5 },
  { name: 'Aromatherapy Diffuser', price: 40.00, category: 'Health & Wellness', brand: 'Xiaomi', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9', rating: 4.7 },
  // Music
  { name: 'Bluetooth Headphones', price: 80.00, category: 'Music', brand: 'Xiaomi', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9', rating: 4.7 },
  { name: 'Acoustic Guitar', price: 220.00, category: 'Music', brand: 'Nike', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9', rating: 4.5 },
  { name: 'Digital Piano', price: 350.00, category: 'Music', brand: 'Columbia', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca', rating: 4.8 },
  { name: 'Drum Pad', price: 110.00, category: 'Music', brand: 'Demix', image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2', rating: 4.4 },
  // Gaming
  { name: 'Gaming Mouse', price: 49.99, category: 'Gaming', brand: 'Xiaomi', image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2', rating: 4.6 },
  { name: 'Mechanical Keyboard', price: 89.99, category: 'Gaming', brand: 'Adidas', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c', rating: 4.7 },
  { name: 'Gaming Chair', price: 199.00, category: 'Gaming', brand: 'Nike', image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c', rating: 4.8 },
  { name: 'VR Headset', price: 299.00, category: 'Gaming', brand: 'Columbia', image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308', rating: 4.7 },
  // Deals
  { name: 'Discounted Running Shoes', price: 75.00, category: 'Deals', brand: 'Nike', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f', rating: 4.4 },
  { name: 'Clearance Hoodie', price: 40.00, category: 'Deals', brand: 'Adidas', image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2', rating: 4.1 },
  { name: 'Flash Sale Backpack', price: 55.00, category: 'Deals', brand: 'Demix', image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b', rating: 4.3 },
  { name: 'Limited Offer Sunglasses', price: 35.00, category: 'Deals', brand: 'Columbia', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c', rating: 4.2 },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Item.deleteMany({});
  await Item.insertMany(items);
  console.log('Dummy products inserted!');
  process.exit();
}

seed();
