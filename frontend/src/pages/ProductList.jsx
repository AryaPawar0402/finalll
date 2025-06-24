import { useEffect, useState } from "react";
import api from "../services/api"; // ✅ Corrected import
import "./ProductList.css";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/product/all-with-shops");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        if (err.response?.status === 401) {
          setError("Unauthorized. Please log in.");
        } else {
          setError("Failed to load products.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!cart.find((p) => p.productId === product.productId)) {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`Added "${product.productName}" to cart!`);
    } else {
      alert("Product already in cart");
    }
  };

  const handleBuyNow = (product) => {
    navigate("/buy-now", { state: { product } });
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;
  if (products.length === 0) return <p>No products available.</p>;

  return (
    <div className="product-list-container">
      <h2>🛒 Products</h2>
      <div className="product-cards">
        {products.map((p) => (
          <div className="product-card" key={p.productId}>
            <div
              className="product-image"
              style={{
                backgroundImage: p.imageUrl ? `url(${p.imageUrl})` : "none",
              }}
            >
              {!p.imageUrl && <div className="image-placeholder">No Image</div>}
            </div>

            <h3>{p.productName}</h3>
            <p className="description">{p.productDescription}</p>
            <p className="price">Price: ₹{p.productPrice}</p>
            <p className="shop-info">
              Shop: <strong>{p.shopName}</strong><br />
              Location: <em>{p.shopLocation}</em>
            </p>

            <div className="actions">
              <button className="btn-add" onClick={() => handleAddToCart(p)}>
                Add to Cart
              </button>
              <button className="btn-buy" onClick={() => handleBuyNow(p)}>
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
