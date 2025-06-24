import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const removeFromCart = (productId) => {
    const updated = cart.filter((p) => p.productId !== productId);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  if (cart.length === 0)
    return <p style={{ padding: "2rem", fontSize: "1.2rem" }}>🛒 Your cart is empty.</p>;

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <div className="cart-list">
        {cart.map((p) => (
          <div className="cart-card" key={p.productId}>
            <div
              className="cart-image"
              style={{
                backgroundImage: p.imageUrl ? `url(${p.imageUrl})` : "none",
              }}
            >
              {!p.imageUrl && <div className="image-placeholder">No Image</div>}
            </div>

            <div className="cart-info">
              <h3>{p.productName}</h3>
              <p className="description">{p.productDescription}</p>
              <p className="price">₹{p.productPrice}</p>
              <p className="shop">
                <strong>{p.shopName}</strong> | <em>{p.shopLocation}</em>
              </p>
            </div>

            <div className="cart-actions">
              <button onClick={() => navigate("/buy-now", { state: { product: p } })}>
                Buy Now
              </button>
              <button onClick={() => removeFromCart(p.productId)} className="remove-btn">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
