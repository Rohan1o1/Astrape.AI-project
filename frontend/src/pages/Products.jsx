
import { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Button, Grid, Tabs, Tab, Chip, Stack, InputAdornment, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const categories = [
  'All', 'Deals', 'Crypto', 'Fashion', 'Health & Wellness', 'Art', 'Home', 'Sport', 'Music', 'Gaming'
];


export default function Products({ onAddToCart, filter }) {
  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
  };
  const [products, setProducts] = useState([]);
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    let url = 'http://localhost:5000/api/items?';
    if (categories[tab] && categories[tab] !== 'All') url += `category=${categories[tab]}&`;
    if (filter && filter.price) url += `minPrice=${filter.price[0]}&maxPrice=${filter.price[1]}&`;
    if (filter && filter.rating) url += `rating=${filter.rating}&`;
    if (filter && filter.brands) {
      const selectedBrands = Object.keys(filter.brands).filter(b => filter.brands[b]);
      if (selectedBrands.length) url += `brands=${selectedBrands.join(',')}&`;
    }
    if (search) url += `name=${encodeURIComponent(search)}`;
    fetch(url)
      .then(res => res.json())
      .then(setProducts);
  }, [filter, tab, search]);

  const handleTabChange = (e, newValue) => {
    setTab(newValue);
  };

  return (
    <Box sx={{
      background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%, #a1c4fd 100%)',
      p: 3,
      borderRadius: 3,
      boxShadow: '0 2px 8px #0001',
      width: '100vw',
      minHeight: 'calc(100vh - 64px)',
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
    }}>
      <Box sx={{ width: '100%', maxWidth: 1440, mx: 'auto', px: { xs: 1, sm: 3, md: 6 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Tabs
        value={tab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 3 }}
      >
        {categories.map((cat, idx) => (
          <Tab key={cat} label={cat} sx={{ fontWeight: 600 }} />
        ))}
      </Tabs>
      <form onSubmit={handleSearch} style={{ marginBottom: 24, width: '100%', maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
        <TextField
          placeholder="Search products..."
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton type="submit"><SearchIcon /></IconButton>
              </InputAdornment>
            )
          }}
          fullWidth
          size="small"
        />
      </form>
      <Grid container spacing={3} sx={{ maxWidth: 1200, margin: '0 auto' }}>
        {products.map((p, idx) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={p._id}>
            <Card sx={{
              borderRadius: 4,
              boxShadow: '0 2px 12px #0002',
              position: 'relative',
              overflow: 'visible',
              width: 270,
              minHeight: 370,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              mx: 'auto',
            }}>
              {p.image && (
                <CardMedia
                  component="img"
                  image={p.image}
                  alt={p.name}
                  sx={{
                    objectFit: 'contain',
                    width: 200,
                    height: 160,
                    p: 2,
                    bgcolor: '#f6f7fb',
                    mx: 'auto',
                  }}
                />
              )}
              <CardContent sx={{ width: '100%', p: 2, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                  {p.isTopItem && <Chip label="Top item" color="warning" size="small" />}
                  {p.rating && <Chip label={`${p.rating}/5 ★`} color="primary" size="small" />}
                </Stack>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, width: '100%' }} noWrap>{p.name}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, width: '100%' }} noWrap>{p.category}</Typography>
                {p.brand && <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, width: '100%' }}>Brand: {p.brand}</Typography>}
                {p.description && <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, width: '100%' }}>{p.description}</Typography>}
                <Typography variant="h5" color="primary" sx={{ mt: 1, mb: 1, width: '100%' }}>
                  ${p.price}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ borderRadius: 2, fontWeight: 600 }}
                  onClick={e => { e.stopPropagation(); onAddToCart(p._id); }}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      </Box>
    </Box>
  );
}
