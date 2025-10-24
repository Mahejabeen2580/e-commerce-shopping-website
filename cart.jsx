function Cart({ cartItems, onRemove, onIncrease, onDecrease, total }) {
  return (
    <div>
      <h2>🛒 Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} - ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
                <button onClick={() => onIncrease(item.id)} style={{ marginLeft: '10px' }}>+</button>
                <button onClick={() => onDecrease(item.id)}>-</button>
                <button onClick={() => onRemove(item.id)} style={{ marginLeft: '10px' }}>Remove</button>
              </li>
            ))}
          </ul>

          {/* 💰 Total Cart Value */}
          <p style={{ fontWeight: 'bold', marginTop: '20px' }}>
            🧾 Total: ₹{total}
          </p>
        </>
      )}
    </div>
  );
}

export default Cart;