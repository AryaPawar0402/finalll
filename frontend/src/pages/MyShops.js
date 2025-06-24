// src/pages/MyShops.js
import { useEffect, useState } from "react";
import api from "../services/api"; // Reusable Axios instance
import "./MyShops.css";

export default function MyShops() {
  const [shops, setShops] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const res = await api.get("/shop/my-shops"); // ✅ Correct endpoint
        setShops(res.data);
      } catch (err) {
        console.error("Error loading shops:", err);
        if (err.response?.status === 401) {
          setError("Unauthorized. Please log in again.");
        } else if (err.response?.status === 403) {
          setError("Access denied. Only approved sellers can view shops.");
        } else {
          setError("Something went wrong while loading shops.");
        }
      }
    };

    fetchShops();
  }, []);

  return (
    <div className="shop-list">
      <h2>My Shops</h2>

      {error && <p className="error-message">{error}</p>}

      {shops.length === 0 && !error ? (
        <p>No shops found.</p>
      ) : (
        <ul>
          {shops.map((shop) => (
            <li key={shop.id}>
              <p><strong>Shop Name:</strong> {shop.shopName}</p>
              <p><strong>Seller Email:</strong> {shop.seller?.email || "N/A"}</p>
              <p><strong>Location:</strong> {shop.location}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
