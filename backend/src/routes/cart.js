import express from 'express';
import User from '../models/User.js';
import Item from '../models/Item.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get cart items for logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('cart.item');
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add item to cart
router.post('/add', auth, async (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    const user = await User.findById(req.user.id);
    const cartItem = user.cart.find(c => c.item.toString() === itemId);
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      user.cart.push({ item: itemId, quantity });
    }
    await user.save();
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove item from cart
router.post('/remove', auth, async (req, res) => {
  try {
    const { itemId } = req.body;
    const user = await User.findById(req.user.id);
    user.cart = user.cart.filter(c => c.item.toString() !== itemId);
    await user.save();
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Update item quantity in cart
router.post('/update', auth, async (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    const user = await User.findById(req.user.id);
    const cartItem = user.cart.find(c => c.item.toString() === itemId);
    if (!cartItem) return res.status(404).json({ message: 'Item not in cart' });
    if (quantity < 1) {
      user.cart = user.cart.filter(c => c.item.toString() !== itemId);
    } else {
      cartItem.quantity = quantity;
    }
    await user.save();
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
