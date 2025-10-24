import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Checkout from './Checkout';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleIncreaseQuantity = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home onAddToCart={handleAddToCart} />
              <div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
                <h2 style={{ color: '#333', borderBottom: '2px solid #28a745', paddingBottom: '5px' }}>🛒 Your Cart</h2>
                {cartItems.length === 0 ? (
                  <p>No items in cart</p>
                ) : (
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {cartItems.map(item => (
                      <li
                        key={item.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px',
                          borderBottom: '1px solid #eee'
                        }}
                      >
                        <span>
                          {item.name} - ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
                        </span>
                        <div>
                          <button style={{ marginRight: '5px' }} onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                          <button style={{ marginRight: '5px' }} onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                          <button
                            style={{
                              backgroundColor: '#dc3545',
                              color: '#fff',
                              border: 'none',
                              padding: '5px 8px',
                              borderRadius: '4px'
                            }}
                            onClick={() => handleRemoveFromCart(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                <h3>Total: ₹{totalPrice}</h3>
                <button
                  onClick={() => window.location.href = '/checkout'}
                  style={{
                    marginTop: '10px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 15px',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          }
        />
        <Route
          path="/checkout"
          element={<Checkout cartItems={cartItems} total={totalPrice} />}
        />
      </Routes>
    </Router>
  );
}

export default App;