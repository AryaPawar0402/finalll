// src/pages/BuyNow.jsx
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BuyNow.css";

export default function BuyNow() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    quantity: 1,
  });

  if (!product) {
    return <p>No product selected. Please go back and select a product.</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Order placed for ${formData.quantity} x ${product.name}!\nWe will contact you soon.`);
    navigate("/"); // redirect back to home or orders page if exists
  };

  return (
    <div className="buy-now-container">
      <h2>Buy Now: {product.name}</h2>
      <p>Price: ₹{product.price}</p>
      <form onSubmit={handleSubmit} className="buy-now-form">
        <label>
          Full Name:
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Delivery Address:
          <textarea
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className="btn-buy-now-submit">Place Order</button>
      </form>
    </div>
  );
}
