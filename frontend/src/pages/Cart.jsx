
import React from 'react';

export default function Cart({ cart, refreshCart, onRemove, open, onClose }) {
  // Quantity handlers
  const handleRemove = async (itemId) => {
    if (onRemove) await onRemove(itemId);
    if (refreshCart) await refreshCart();
  };
  const handleUpdateQty = async (itemId, qty) => {
    if (qty < 1) return;
  await fetch(`${import.meta.env.VITE_API_URL}/api/cart/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify({ itemId, quantity: qty })
    });
    if (refreshCart) await refreshCart();
  };

  // Glassmorphism background
  const panelWidth = 400;
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        height: '100vh',
        width: panelWidth,
        background: 'rgba(255,255,255,0.15)',
        boxShadow: open ? '-4px 0 24px #0002' : 'none',
        zIndex: 2000,
        transform: open ? 'translateX(0)' : `translateX(${panelWidth}px)`,
        transition: 'transform 0.4s cubic-bezier(.4,0,.2,1)',
        display: 'flex',
        flexDirection: 'column',
        pointerEvents: open ? 'auto' : 'none',
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        borderLeft: '1.5px solid rgba(255,255,255,0.3)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 20, borderBottom: '1px solid #eee', background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(8px)' }}>
        <h2 style={{ margin: 0, fontWeight: 700, letterSpacing: 1 }}>Your Cart</h2>
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#888', fontWeight: 'bold', lineHeight: 1 }}
          aria-label="Close cart"
        >
          ×
        </button>
      </div>
      <ul style={{ listStyle: 'none', padding: 24, flex: 1, margin: 0, overflowY: 'auto' }}>
        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#aaa', marginTop: 60 }}>
            <img src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png" alt="Empty cart" style={{ width: 120, opacity: 0.5 }} />
            <div style={{ marginTop: 16, fontSize: 18 }}>Your cart is empty</div>
          </div>
        ) : cart.map(c => (
          c.item ? (
            <li key={c.item._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 0', borderBottom: '1px solid #e0e0e0', background: 'rgba(255,255,255,0.25)', borderRadius: 10, marginBottom: 12, boxShadow: '0 2px 8px #0001' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <img src={c.item.image || 'https://via.placeholder.com/48'} alt={c.item.name} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, boxShadow: '0 1px 4px #0001' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontWeight: 600, fontSize: 16 }}>{c.item.name}</span>
                  <span style={{ color: '#888', fontSize: 14 }}>{c.item.brand || ''}</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button onClick={() => handleUpdateQty(c.item._id, c.quantity - 1)} style={{ padding: '4px 10px', borderRadius: 6, background: '#f0f0f0', border: 'none', fontWeight: 'bold', fontSize: 18, cursor: 'pointer', color: '#333', marginRight: 2 }}>-</button>
                <span style={{ minWidth: 24, textAlign: 'center', fontWeight: 600, fontSize: 16, color: '#222', background: 'rgba(255,255,255,0.7)', borderRadius: 4, padding: '2px 8px' }}>{c.quantity}</span>
                <button onClick={() => handleUpdateQty(c.item._id, c.quantity + 1)} style={{ padding: '4px 10px', borderRadius: 6, background: '#f0f0f0', border: 'none', fontWeight: 'bold', fontSize: 18, cursor: 'pointer', color: '#333', marginLeft: 2 }}>+</button>
                <button onClick={() => handleRemove(c.item._id)} style={{ padding: '4px 10px', borderRadius: 6, background: '#dc3545', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginLeft: 8 }}>Remove</button>
              </div>
            </li>
          ) : null
        ))}
      </ul>
    </div>
  );
}
