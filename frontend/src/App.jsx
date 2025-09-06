
import React, { useState } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Products from './pages/Products';
import Cart from './pages/Cart';
import { AppBar, Toolbar, Typography, IconButton, Badge, Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Button, CssBaseline, Slider, Checkbox, FormControlLabel, FormGroup, Rating } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CategoryIcon from '@mui/icons-material/Category';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';



function App() {
  const [page, setPage] = useState('products'); // still used for login/signup
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  });
  const [cartCount, setCartCount] = useState(0);
  const [cart, setCart] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  // Filters
  const [price, setPrice] = useState([20, 1130]);
  const [brands, setBrands] = useState({ Adidas: true, Columbia: true, Demix: false, 'New Balance': false, Nike: true, Xiaomi: true, Asics: false });
  const [rating, setRating] = useState(0);

  const handleLogin = (token, user) => {
    setToken(token);
    setUser(user);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setPage('products');
    setLoginOpen(false);
    setTimeout(() => { refreshCart(); }, 0);
  };

  const handleLogout = () => {
    setToken('');
    setUser(null);
    setCart([]);
    setCartCount(0);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setPage('products');
  };

  const handleSignup = (token, user) => {
    setToken(token);
    setUser(user);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setPage('products');
    setSignupOpen(false);
    setTimeout(() => { refreshCart(); }, 0);
  };

  // Fetch cart from backend
  const refreshCart = async () => {
    if (!token) return;
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setCart(data);
    setCartCount(data.reduce((sum, c) => sum + (c.quantity || 0), 0));
  };

  const handleAddToCart = async (itemId) => {
    if (!token) {
      setPage('login');
      return;
    }
  await fetch(`${import.meta.env.VITE_API_URL}/api/cart/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ itemId, quantity: 1 })
    });
    await refreshCart();
    setCartOpen(true);
  };


  // Remove from cart and update cartCount, but let Cart page handle UI update
  const handleRemoveFromCart = async (itemId, onCartUpdate) => {
    if (!token) return;
  await fetch(`${import.meta.env.VITE_API_URL}/api/cart/remove`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ itemId })
    });
    await refreshCart();
    if (onCartUpdate) onCartUpdate();
  };

  // Refresh cart when cart is opened
  React.useEffect(() => {
    if (cartOpen && token) refreshCart();
    // eslint-disable-next-line
  }, [cartOpen, token]);

  // AppBar and Drawer for navigation and filters
  return (
    <Box sx={{ display: 'flex', bgcolor: '#f6f7fb', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar position="fixed" color="inherit" elevation={1} sx={{ zIndex: 1201 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => setDrawerOpen(true)} sx={{ mr: 2 }}>
            <CategoryIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 1 }}>
            Astrape
          </Typography>
          <IconButton color="inherit" onClick={() => setPage('products')}><HomeIcon /></IconButton>
          <IconButton color="inherit" onClick={() => setCartOpen(true)}>
            <Badge badgeContent={cartCount} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit"><FavoriteIcon /></IconButton>
          {!user && <IconButton color="inherit" onClick={() => setLoginOpen(true)}><LoginIcon /></IconButton>}
          {!user && <IconButton color="inherit" onClick={() => setSignupOpen(true)}><PersonAddIcon /></IconButton>}
          {user && <IconButton color="inherit" onClick={handleLogout}><LogoutIcon /></IconButton>}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': { width: 300, boxSizing: 'border-box', bgcolor: '#fff' }
        }}
      >
        <Toolbar />
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Filters</Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2" sx={{ mb: 1 }}>Price Range</Typography>
          <Slider
            value={price}
            min={20}
            max={1130}
            onChange={(_, v) => setPrice(v)}
            valueLabelDisplay="auto"
            sx={{ mb: 2 }}
          />
          <Typography variant="body2" sx={{ mb: 1 }}>Star Rating</Typography>
          <Rating
            value={rating}
            precision={0.5}
            onChange={(_, v) => setRating(v || 0)}
            sx={{ mb: 2 }}
          />
          <Typography variant="body2" sx={{ mb: 1 }}>Brand</Typography>
          <FormGroup>
            {Object.keys(brands).map(b => (
              <FormControlLabel
                key={b}
                control={<Checkbox checked={brands[b]} onChange={e => setBrands(br => ({ ...br, [b]: e.target.checked }))} />}
                label={b}
              />
            ))}
          </FormGroup>
          <Divider sx={{ my: 2 }} />
          <Button variant="outlined" fullWidth onClick={() => {
            setPrice([20, 1130]);
            setBrands({ Adidas: true, Columbia: true, Demix: false, 'New Balance': false, Nike: true, Xiaomi: true, Asics: false });
            setRating(0);
          }}>Reset</Button>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, maxWidth: 1200, mx: 'auto', position: 'relative' }}>
        {/* Slide-in Login Modal */}
        <div
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            height: '100vh',
            width: 400,
            background: '#fff',
            boxShadow: loginOpen ? '-4px 0 24px #0002' : 'none',
            zIndex: 2100,
            transform: loginOpen ? 'translateX(0)' : 'translateX(400px)',
            transition: 'transform 0.4s cubic-bezier(.4,0,.2,1)',
            display: 'flex',
            flexDirection: 'column',
            pointerEvents: loginOpen ? 'auto' : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 20, borderBottom: '1px solid #eee' }}>
            <h2 style={{ margin: 0 }}>Login</h2>
            <button
              onClick={() => setLoginOpen(false)}
              style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#888', fontWeight: 'bold', lineHeight: 1 }}
              aria-label="Close login"
            >
              ×
            </button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
            <Login onLogin={handleLogin} />
          </div>
        </div>
        {/* Slide-in Signup Modal */}
        <div
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            height: '100vh',
            width: 400,
            background: '#fff',
            boxShadow: signupOpen ? '-4px 0 24px #0002' : 'none',
            zIndex: 2100,
            transform: signupOpen ? 'translateX(0)' : 'translateX(400px)',
            transition: 'transform 0.4s cubic-bezier(.4,0,.2,1)',
            display: 'flex',
            flexDirection: 'column',
            pointerEvents: signupOpen ? 'auto' : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 20, borderBottom: '1px solid #eee' }}>
            <h2 style={{ margin: 0 }}>Signup</h2>
            <button
              onClick={() => setSignupOpen(false)}
              style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#888', fontWeight: 'bold', lineHeight: 1 }}
              aria-label="Close signup"
            >
              ×
            </button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
            <Signup onSignup={handleSignup} />
          </div>
        </div>
        {/* Always show products page in background */}
        {(page === 'products' || page === 'login' || page === 'signup') && (
          <Products onAddToCart={handleAddToCart} filter={{ price, brands, rating }} />
        )}
        {/* Cart slides in as overlay */}
        <Cart
          open={cartOpen}
          onClose={() => setCartOpen(false)}
          cart={cart}
          refreshCart={refreshCart}
          token={token}
          onRemove={handleRemoveFromCart}
        />
      </Box>
    </Box>
  );
}
export default App;
