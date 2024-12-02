// PromotionsPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPromotions } from './productsData';

function PromotionsPage() {
  const [cartCount, setCartCount] = useState(0);
  const [quantities, setQuantities] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const data = await getPromotions();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching promotions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  const updateQuantity = (itemId, change) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + change)
    }));
  };

  const handleAddToCart = (productId) => {
    const quantity = quantities[productId] || 0;
    if (quantity > 0) {
      setCartCount(prev => prev + quantity);
      setQuantities(prev => ({
        ...prev,
        [productId]: 0
      }));
    }
  };

  return (
    <>
      <div className="location-bar">
        SSH Delivery
      </div>

      <header className="top-bar">
        <div className="logo-search-location">
          <div id="logo">
            <img src="/api/placeholder/130/130" alt="Logo" id="logo-img" />
          </div>
          <div id="search-box">
            <input type="text" placeholder="Search promotional items..." />
          </div>
        </div>
        <div id="location-btn-container">
          <span id="location-text">Deliver to:</span>
          <button id="location-btn">SSH Home London, UK</button>
        </div>
      </header>

      <section id="promotion-section">
        <h2>Special Offers - 20% Off Selected Items</h2>
        {loading ? (
          <div className="loading">Loading promotions...</div>
        ) : (
          <div className="promotion-container">
            {products.map(product => (
              <div key={product.id} className="promotion-item">
                <div className="discount-badge">-{product.discount}%</div>
                <div className="image-container">
                  <img src={product.image} alt={product.name} />
                </div>
                <p>{product.name}</p>
                <p className="original-price">£{product.originalPrice.toFixed(2)}</p>
                <p className="discounted-price">£{product.discountedPrice.toFixed(2)}</p>
                <div className="quantity-counter">
                  <button 
                    className="quantity-btn" 
                    onClick={() => updateQuantity(product.id, -1)}
                  >
                    -
                  </button>
                  <span className="quantity-display">
                    {quantities[product.id] || 0}
                  </span>
                  <button 
                    className="quantity-btn" 
                    onClick={() => updateQuantity(product.id, 1)}
                  >
                    +
                  </button>
                </div>
                <button onClick={() => handleAddToCart(product.id)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="bottom-nav">
        <button onClick={() => navigate('/')}>Categories</button>
        <button onClick={() => navigate('/')}>Home</button>
        <button id="cart-btn">
          <img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" alt="Cart" />
          Cart ({cartCount})
        </button>
      </div>

      <style jsx>{`
        /* Copy all your existing CSS styles here */
      `}</style>
    </>
  );
}

export default PromotionsPage;