import { useEffect, useState } from 'react';
import axios from 'axios';

function Home({ onAddToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(res => {
        console.log('Fetched products:', res.data);
        setProducts(res.data);
      })
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: '#333', borderBottom: '2px solid #007bff', paddingBottom: '5px' }}>🛍️ Our Products</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.map(product => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '10px',
              padding: '15px',
              width: '220px',
              backgroundColor: '#f9f9f9',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/200x150?text=Image+Not+Found';
              }}
            />
            <h3 style={{ margin: '10px 0 5px' }}>{product.name}</h3>
            <p style={{ fontSize: '14px', color: '#555' }}>{product.description}</p>
            <strong style={{ display: 'block', marginBottom: '10px' }}>₹{product.price}</strong>
            <button
              onClick={() => onAddToCart(product)}
              style={{
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;