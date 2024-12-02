import React, { useState } from 'react';

function BakeryPage() {
  const [cartCount, setCartCount] = useState(0);
  const [quantities, setQuantities] = useState({});

  const updateQuantity = (itemId, change) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + change)
    }));
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
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: sticky;
            top: 40px;
            z-index: 100;
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

          #bakery-section {
            text-align: center;
            padding: 20px;
            margin-bottom: 80px;
          }

          #bakery-section h2 {
            color: #3498db;
            margin-bottom: 20px;
          }

          .bakery-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            justify-content: center;
            gap: 20px;
            max-width: 1000px;
            margin: 0 auto;
          }

          .bakery-item {
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            padding: 15px;
            text-align: center;
            transition: transform 0.3s ease;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .bakery-item:hover {
            transform: scale(1.05);
          }

          .image-container {
            width: 130px;
            height: 130px;
            border-radius: 50%;
            overflow: hidden;
            border: 3px solid #3498db;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: white;
            position: relative;
          }

          .image-container img {
            width: 90%;
            height: 90%;
            object-fit: cover;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }

          .quantity-counter {
            display: flex;
            align-items: center;
            gap: 8px;
            margin: 10px 0;
          }

          .quantity-btn {
            background-color: #3498db;
            color: white;
            border: none;
            width: 18px;
            height: 18px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.3s;
            padding: 0;
            line-height: 1;
          }

          .quantity-btn:hover {
            background-color: #2980b9;
          }

          .quantity-display {
            font-size: 14px;
            font-weight: bold;
            color: #2c3e50;
            min-width: 20px;
            text-align: center;
          }

          .bakery-item p {
            margin: 10px 0;
            color: #2c3e50;
            font-weight: bold;
          }

          .bakery-item .price {
            color: #3498db;
            font-size: 18px;
          }

          .bakery-item button {
            background-color: #3498db;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
            margin-top: 10px;
            width: 120px;
          }

          .bakery-item button:hover {
            background-color: #2980b9;
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
          }

          #cart-btn img {
            max-height: 20px;
            margin-right: 10px;
          }

          @media (max-width: 768px) {
            .bakery-container {
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
            .bakery-container {
              grid-template-columns: repeat(1, 1fr);
            }
          }
        `}
      </style>

      <div className="location-bar">
        SSH Delivery
      </div>

      <header className="top-bar">
        <div className="logo-search-location">
          <div id="logo">
            <img src="/api/placeholder/130/130" alt="Logo" id="logo-img" />
          </div>
          <div id="search-box">
            <input type="text" placeholder="Search bakery items..." />
          </div>
        </div>
        <div id="location-btn-container">
          <span id="location-text">Deliver to:</span>
          <button id="location-btn">SSH Home London, UK</button>
        </div>
      </header>

     
      <section id="bakery-section">
        <h2>Bakery Products</h2>
        <div className="bakery-container">
          <div className="bakery-item">
            <div className="image-container">
              <img src="https://bonnibakery.com/wp-content/uploads/2021/01/ChocolateCake-2-scaled.jpg" alt="Chocolate Cake" />
            </div>
            <p>Chocolate Cake</p>
            <p className="price">£18.99 per cake</p>
            <div className="quantity-counter">
              <button className="quantity-btn" onClick={() => updateQuantity('chocolate-cake', -1)}>-</button>
              <span className="quantity-display">{quantities['chocolate-cake'] || 0}</span>
              <button className="quantity-btn" onClick={() => updateQuantity('chocolate-cake', 1)}>+</button>
            </div>
            <button>Add to Cart</button>
          </div>

          <div className="bakery-item">
            <div className="image-container">
              <img src="https://www.curlyscooking.co.uk/wp-content/uploads/2014/03/Vanilla-Cupcakes-G-scaled.jpg" alt="Vanilla Cupcake" />
            </div>
            <p>Vanilla Cupcakes</p>
            <p className="price">£2.50 per piece</p>
            <div className="quantity-counter">
              <button className="quantity-btn" onClick={() => updateQuantity('vanilla-cupcake', -1)}>-</button>
              <span className="quantity-display">{quantities['vanilla-cupcake'] || 0}</span>
              <button className="quantity-btn" onClick={() => updateQuantity('vanilla-cupcake', 1)}>+</button>
            </div>
            <button>Add to Cart</button>
          </div>

          <div className="bakery-item">
            <div className="image-container">
              <img src="https://chefsavvy.com/wp-content/uploads/double-chocolate-chip-cookies-2.jpg" alt="Chocolate Cookies" />
            </div>
            <p>Chocolate Cookies</p>
            <p className="price">£3.99 per dozen</p>
            <div className="quantity-counter">
              <button className="quantity-btn" onClick={() => updateQuantity('chocolate-cookies', -1)}>-</button>
              <span className="quantity-display">{quantities['chocolate-cookies'] || 0}</span>
              <button className="quantity-btn" onClick={() => updateQuantity('chocolate-cookies', 1)}>+</button>
            </div>
            <button>Add to Cart</button>
          </div>

          <div className="bakery-item">
            <div className="image-container">
              <img src="https://i0.wp.com/daddioskitchen.com/wp-content/uploads/2022/12/IMG-4832.jpg?fit=3024%2C3024&ssl=1" alt="Sourdough Bread" />
            </div>
            <p>Sourdough Bread</p>
            <p className="price">£4.50 per loaf</p>
            <div className="quantity-counter">
              <button className="quantity-btn" onClick={() => updateQuantity('sourdough-bread', -1)}>-</button>
              <span className="quantity-display">{quantities['sourdough-bread'] || 0}</span>
              <button className="quantity-btn" onClick={() => updateQuantity('sourdough-bread', 1)}>+</button>
            </div>
            <button>Add to Cart</button>
          </div>

          <div className="bakery-item">
            <div className="image-container">
              <img src="https://www.rainbownourishments.com/wp-content/uploads/2022/03/vegan-blueberry-muffins-1-1.jpg" alt="Blueberry Muffins" />
            </div>
            <p>Blueberry Muffins</p>
            <p className="price">£2.75 per piece</p>
            <div className="quantity-counter">
              <button className="quantity-btn" onClick={() => updateQuantity('blueberry-muffins', -1)}>-</button>
              <span className="quantity-display">{quantities['blueberry-muffins'] || 0}</span>
              <button className="quantity-btn" onClick={() => updateQuantity('blueberry-muffins', 1)}>+</button>
            </div>
            <button>Add to Cart</button>
          </div>

          <div className="bakery-item">
            <div className="image-container">
              <img src="https://pngimg.com/d/donut_PNG97.png" alt="Glazed Donuts" />
            </div>
            <p>Glazed Donuts</p>
            <p className="price">£1.99 per piece</p>
            <div className="quantity-counter">
              <button className="quantity-btn" onClick={() => updateQuantity('glazed-donuts', -1)}>-</button>
              <span className="quantity-display">{quantities['glazed-donuts'] || 0}</span>
              <button className="quantity-btn" onClick={() => updateQuantity('glazed-donuts', 1)}>+</button>
            </div>
            <button>Add to Cart</button>
          </div>

          <div className="bakery-item">
            <div className="image-container">
              <img src="https://pngimg.com/d/croissant_PNG47.png" alt="Almond Croissant" />
            </div>
            <p>Almond Croissant</p>
            <p className="price">£2.95 per piece</p>
            <div className="quantity-counter">
              <button className="quantity-btn" onClick={() => updateQuantity('almond-croissant', -1)}>-</button>
              <span className="quantity-display">{quantities['almond-croissant'] || 0}</span>
              <button className="quantity-btn" onClick={() => updateQuantity('almond-croissant', 1)}>+</button>
            </div>
            <button>Add to Cart</button>
          </div>

          <div className="bakery-item">
            <div className="image-container">
              <img src="https://stateofdinner.com/wp-content/uploads/2023/03/no-bake-vanilla-cheesecake-featured-2-500x375.jpg" alt="Classic Cheesecake" />
            </div>
            <p>Classic Cheesecake</p>
            <p className="price">£16.99 per cake</p>
            <div className="quantity-counter">
              <button className="quantity-btn" onClick={() => updateQuantity('classic-cheesecake', -1)}>-</button>
              <span className="quantity-display">{quantities['classic-cheesecake'] || 0}</span>
              <button className="quantity-btn" onClick={() => updateQuantity('classic-cheesecake', 1)}>+</button>
            </div>
            <button>Add to Cart</button>
          </div>

          <div className="bakery-item">
            <div className="image-container">
              <img src="https://pngimg.com/d/baguette_PNG16.png" alt="French Baguette" />
            </div>
            <p>French Baguette</p>
            <p className="price">£2.25 per piece</p>
            <div className="quantity-counter">
              <button className="quantity-btn" onClick={() => updateQuantity('french-baguette', -1)}>-</button>
              <span className="quantity-display">{quantities['french-baguette'] || 0}</span>
              <button className="quantity-btn" onClick={() => updateQuantity('french-baguette', 1)}>+</button>
            </div>
            <button>Add to Cart</button>
          </div>

          <div className="bakery-item">
            <div className="image-container">
              <img src="https://gardengrubblog.com/wp-content/uploads/2021/06/Untitled-design-2021-06-16T160410.428.jpg" alt="Soft Pretzels" />
            </div>
            <p>Soft Pretzels</p>
            <p className="price">£2.50 per piece</p>
            <div className="quantity-counter">
              <button className="quantity-btn" onClick={() => updateQuantity('soft-pretzels', -1)}>-</button>
              <span className="quantity-display">{quantities['soft-pretzels'] || 0}</span>
              <button className="quantity-btn" onClick={() => updateQuantity('soft-pretzels', 1)}>+</button>
            </div>
            <button>Add to Cart</button>
          </div>

          <div className="bakery-item">
            <div className="image-container">
              <img src="https://www.thespruceeats.com/thmb/Gdj081ImzyyMFV3L4DFCjvTigrc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/chocolate-eclairs-recipe-1375148-hero-01-e9f7cc83531b4110ad0b6ef0cfb125d8.jpg" alt="Chocolate Eclairs" />
            </div>
            <p>Chocolate Eclairs</p>
            <p className="price">£3.25 per piece</p>
            <div className="quantity-counter">
              <button className="quantity-btn" onClick={() => updateQuantity('chocolate-eclairs', -1)}>-</button>
              <span className="quantity-display">{quantities['chocolate-eclairs'] || 0}</span>
              <button className="quantity-btn" onClick={() => updateQuantity('chocolate-eclairs', 1)}>+</button>
            </div>
            <button>Add to Cart</button>
          </div>

          <div className="bakery-item">
            <div className="image-container">
              <img src="https://schoolnightvegan.com/wp-content/uploads/2024/08/vegan-cinnamon-rolls-34.jpg" alt="Cinnamon Rolls" />
            </div>
            <p>Cinnamon Rolls</p>
            <p className="price">£2.99 per piece</p>
            <div className="quantity-counter">
              <button className="quantity-btn" onClick={() => updateQuantity('cinnamon-rolls', -1)}>-</button>
              <span className="quantity-display">{quantities['cinnamon-rolls'] || 0}</span>
              <button className="quantity-btn" onClick={() => updateQuantity('cinnamon-rolls', 1)}>+</button>
            </div>
            <button>Add to Cart</button>
          </div>
        </div>
      </section>

      <div className="bottom-nav">
        <button>Categories</button>
        <button>Home</button>
        <button id="cart-btn">
          <img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" alt="Cart" />
          Cart ({cartCount})
        </button>
      </div>
    </>
  );
}

export default BakeryPage;


      