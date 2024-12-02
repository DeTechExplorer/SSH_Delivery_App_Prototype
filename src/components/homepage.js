// HomePage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCategories } from './productsData';

function HomePage() {
  const [cartCount, setCartCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <>
      
      <div className="location-bar">
        SSH Delivery
      </div>

      <header className="top-bar">
        <div className="top-buttons">
          <button id="shared-orders">Shared Orders</button>
          <button id="individual-orders">Individual Orders</button>
        </div>
        
        <div className="logo-search-location">
          <div id="logo">
            <img src="/api/placeholder/130/130" alt="Logo" id="logo-img" />
          </div>
          <div id="search-box">
            <input type="text" placeholder="Search products..." />
          </div>
        </div>
        <div id="location-btn-container">
          <span id="location-text">Deliver to:</span>
          <button id="location-btn">SSH Home London, UK</button>
        </div>
      </header>

      <section className="promo-box">
        <img src="/api/placeholder/1200/300" alt="20% Off on Selected Items" />
      </section>

      <section id="categories">
        <h2>Categories</h2>
        {loading ? (
          <div className="loading">Loading categories...</div>
        ) : (
          <div className="category-container">
            {categories.map(category => (
              <div 
                key={category.id} 
                className="category-item" 
                onClick={() => handleCategoryClick(category.id)}
              >
                <img src={category.image} alt={category.name} />
                <p>{category.name}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="bottom-nav">
        <button onClick={() => navigate('/')}>Home</button>
        <button id="cart-btn">
          <img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" alt="Cart" />
          Cart ({cartCount})
        </button>
      </div>
    </>
  );
}

export default HomePage;