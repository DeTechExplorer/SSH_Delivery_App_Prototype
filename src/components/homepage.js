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
      <style>
        {`
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f0f4f8;
            color: #2c3e50;
          }

          .location-bar {
            background-color: #3498db;
            color: white;
            padding: 10px;
            text-align: center;
            position: sticky;
            top: 0;
            z-index: 100;
          }

          .top-bar {
            background-color: white;
            padding: 10px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: sticky;
            top: 40px;
            z-index: 100;
          }

          .top-buttons {
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            gap: 20px;
          }

          .top-buttons button {
            background-color: #3498db;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          .top-buttons button:hover {
            background-color: #2980b9;
          }

          .logo-search-location {
            display: flex;
            align-items: center;
            gap: 20px;
            flex-grow: 1;
            justify-content: center;
          }

          #logo-img {
            max-height: 130px;
          }

          #search-box input {
            width: 300px;
            padding: 10px;
            border: 2px solid #3498db;
            border-radius: 20px;
          }

          #location-btn-container {
            margin-left: auto;
            display: flex;
            align-items: center;
            gap: 10px;
          }

          #location-text {
            font-size: 16px;
            color: #2c3e50;
          }

          #location-btn {
            padding: 10px 20px;
            background-color: #3498db;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          #location-btn:hover {
            background-color: #2980b9;
          }

          .promo-box {
            background-color: #fff;
            width: 100%;
            height: 300px;
            margin: 20px 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            overflow: hidden;
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .promo-box:hover {
            transform: scale(1.02);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          }

          .promo-box img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            border-radius: 0;
          }

          #categories {
            text-align: center;
            padding: 20px;
            margin-bottom: 80px;
          }

          #categories h2 {
            color: #3498db;
          }

          .category-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            justify-content: center;
            gap: 20px;
            max-width: 1000px;
            margin: 0 auto;
          }

          .category-item {
            text-align: center;
            width: 100%;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            padding: 15px;
            transition: transform 0.3s ease;
            cursor: pointer;
          }

          .category-item:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          }

          .category-item img {
            width: 130px;
            height: 130px;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid #3498db;
            transition: border-color 0.3s ease;
          }

          .category-item:hover img {
            border-color: #2980b9;
          }

          .category-item p {
            margin-top: 10px;
            color: #2c3e50;
            font-weight: bold;
            transition: color 0.3s ease;
          }

          .category-item:hover p {
            color: #3498db;
          }

          .loading {
            text-align: center;
            padding: 20px;
            font-size: 1.2rem;
            color: #3498db;
          }

          .bottom-nav {
            position: fixed;
            bottom: 0;
            width: 100%;
            background-color: white;
            display: flex;
            justify-content: space-around;
            padding: 10px;
            box-shadow: 0 -2px 4px rgba(0,0,0,0.1);
            z-index: 100;
          }

          .bottom-nav button, #cart-btn {
            display: flex;
            align-items: center;
            background-color: #3498db;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .bottom-nav button:hover {
            background-color: #2980b9;
          }

          #cart-btn img {
            max-height: 20px;
            margin-right: 10px;
          }

          @media (max-width: 768px) {
            .category-container {
              grid-template-columns: repeat(2, 1fr);
            }
            
            .top-bar {
              flex-direction: column;
              gap: 10px;
            }

            #search-box input {
              width: 100%;
            }
          }

          @media (max-width: 480px) {
            .category-container {
              grid-template-columns: repeat(2, 1fr);
            }
          }
        `}
      </style>

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

      <section 
  className="promo-box" 
  onClick={() => navigate('/promotions')}
  style={{ cursor: 'pointer' }}
>
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
