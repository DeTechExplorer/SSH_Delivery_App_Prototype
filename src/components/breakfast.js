import React, { useState } from 'react';

function BreakfastPage() {
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

          #breakfast-section {
            text-align: center;
            padding: 20px;
            margin-bottom: 80px;
          }

          #breakfast-section h2 {
            color: #3498db;
            margin-bottom: 20px;
          }

          .breakfast-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            justify-content: center;
            gap: 20px;
            max-width: 1000px;
            margin: 0 auto;
          }

          .breakfast-item {
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

          .breakfast-item:hover {
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

          .breakfast-item p {
            margin: 10px 0;
            color: #2c3e50;
            font-weight: bold;
          }

          .breakfast-item .price {
            color: #3498db;
            font-size: 18px;
          }

          .breakfast-item button {
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

          .breakfast-item button:hover {
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
      <input type="text" placeholder="Search breakfast items..." />
    </div>
  </div>
  <div id="location-btn-container">
    <span id="location-text">Deliver to:</span>
    <button id="location-btn">SSH Home London, UK</button>
  </div>
</header>

<section id="breakfast-section">
  <h2>Breakfast Products</h2>
  <div className="breakfast-container">
    {/* First item */}
    <div className="breakfast-item">
      <div className="image-container">
        <img src="https://pngimg.com/d/croissant_PNG47.png" alt="Croissant" />
      </div>
      <p>Fresh Croissant</p>
      <p className="price">£1.50 per piece</p>
      <div className="quantity-counter">
        <button className="quantity-btn" onClick={() => updateQuantity('croissant', -1)}>-</button>
        <span className="quantity-display">{quantities['croissant'] || 0}</span>
        <button className="quantity-btn" onClick={() => updateQuantity('croissant', 1)}>+</button>
      </div>
      <button>Add to Cart</button>
    </div>

    {/* Second item */}
    <div className="breakfast-item">
      <div className="image-container">
        <img src="https://pngimg.com/d/pancake_PNG97.png" alt="Pancakes" />
      </div>
      <p>Stack of Pancakes</p>
      <p className="price">£3.20 per stack</p>
      <div className="quantity-counter">
        <button className="quantity-btn" onClick={() => updateQuantity('pancakes', -1)}>-</button>
        <span className="quantity-display">{quantities['pancakes'] || 0}</span>
        <button className="quantity-btn" onClick={() => updateQuantity('pancakes', 1)}>+</button>
      </div>
      <button>Add to Cart</button>
    </div>

    {/* Continue with remaining items... */}
    <div className="breakfast-item">
      <div className="image-container">
        <img src="https://images-static.nykaa.com/media/catalog/product/a/4/a4d30b8ALPIN00000013_1.jpg" alt="Alpen Muesli" />
      </div>
      <p>Healthy Muesli</p>
      <p className="price">£1.80 per 500g</p>
      <div className="quantity-counter">
        <button className="quantity-btn" onClick={() => updateQuantity('muesli', -1)}>-</button>
        <span className="quantity-display">{quantities['muesli'] || 0}</span>
        <button className="quantity-btn" onClick={() => updateQuantity('muesli', 1)}>+</button>
      </div>
      <button>Add to Cart</button>
    </div>

    <div className="breakfast-item">
      <div className="image-container">
        <img src="https://pngimg.com/d/bagel_PNG72.png" alt="Bagel" />
      </div>
      <p>Fresh Bagels</p>
      <p className="price">£2.20 per pack</p>
      <div className="quantity-counter">
        <button className="quantity-btn" onClick={() => updateQuantity('bagels', -1)}>-</button>
        <span className="quantity-display">{quantities['bagels'] || 0}</span>
        <button className="quantity-btn" onClick={() => updateQuantity('bagels', 1)}>+</button>
      </div>
      <button>Add to Cart</button>
    </div>

    <div className="breakfast-item">
      <div className="image-container">
        <img src="https://millerandbean.com/cdn/shop/files/BelGaufreWaffles_934x700.jpg?v=1711390490" alt="Waffles" />
      </div>
      <p>Belgian Waffles</p>
      <p className="price">£1.30 per piece</p>
      <div className="quantity-counter">
        <button className="quantity-btn" onClick={() => updateQuantity('waffles', -1)}>-</button>
        <span className="quantity-display">{quantities['waffles'] || 0}</span>
        <button className="quantity-btn" onClick={() => updateQuantity('waffles', 1)}>+</button>
      </div>
      <button>Add to Cart</button>
    </div>

    <div className="breakfast-item">
      <div className="image-container">
        <img src="https://www.fruitsbox.ae/cdn/shop/products/BrownEggs30_528x.jpg?v=1613217638" alt="Eggs" />
      </div>
      <p>Fresh Eggs</p>
      <p className="price">£1.90 per dozen</p>
      <div className="quantity-counter">
        <button className="quantity-btn" onClick={() => updateQuantity('eggs', -1)}>-</button>
        <span className="quantity-display">{quantities['eggs'] || 0}</span>
        <button className="quantity-btn" onClick={() => updateQuantity('eggs', 1)}>+</button>
      </div>
      <button>Add to Cart</button>
    </div>

    <div className="breakfast-item">
      <div className="image-container">
        <img src="https://images.cdn.shoprite.com/detail/00077782030181_1" alt="Sausages" />
      </div>
      <p>Breakfast Sausages</p>
      <p className="price">£3.25 per pack</p>
      <div className="quantity-counter">
        <button className="quantity-btn" onClick={() => updateQuantity('sausages', -1)}>-</button>
        <span className="quantity-display">{quantities['sausages'] || 0}</span>
        <button className="quantity-btn" onClick={() => updateQuantity('sausages', 1)}>+</button>
      </div>
      <button>Add to Cart</button>
    </div>

    <div className="breakfast-item">
      <div className="image-container">
        <img src="https://images-cdn.ubuy.ae/6588477d420c1b46ec21f5b4-branded-quaker-old-fashioned-oats-5.jpg" alt="Oats" />
      </div>
      <p>Jumbo Oats</p>
      <p className="price">£2.15 per kg</p>
      <div className="quantity-counter">
        <button className="quantity-btn" onClick={() => updateQuantity('oats', -1)}>-</button>
        <span className="quantity-display">{quantities['oats'] || 0}</span>
        <button className="quantity-btn" onClick={() => updateQuantity('oats', 1)}>+</button>
      </div>
      <button>Add to Cart</button>
    </div>

    <div className="breakfast-item">
      <div className="image-container">
        <img src="https://assets.totalfoodservice.co.uk/9/54102_8f0a0aabcddfbad04ac2f1f9b6ed810d.png" alt="Cornflakes" />
      </div>
      <p>Kellogg's Cornflakes</p>
      <p className="price">£2.85 per 750g</p>
      <div className="quantity-counter">
        <button className="quantity-btn" onClick={() => updateQuantity('cornflakes', -1)}>-</button>
        <span className="quantity-display">{quantities['cornflakes'] || 0}</span>
        <button className="quantity-btn" onClick={() => updateQuantity('cornflakes', 1)}>+</button>
      </div>
      <button>Add to Cart</button>
    </div>

    <div className="breakfast-item">
      <div className="image-container">
        <img src="https://m.media-amazon.com/images/I/71NSoXxLUHL.jpg" alt="Nutella" />
      </div>
      <p>Nutella Spread</p>
      <p className="price">£3.75 per 400g</p>
      <div className="quantity-counter">
        <button className="quantity-btn" onClick={() => updateQuantity('nutella', -1)}>-</button>
        <span className="quantity-display">{quantities['nutella'] || 0}</span>
        <button className="quantity-btn" onClick={() => updateQuantity('nutella', 1)}>+</button>
      </div>
      <button>Add to Cart</button>
    </div>

    <div className="breakfast-item">
      <div className="image-container">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTANwULRGuyYU48kiixthqeeNSoRr6hBcUVGw&s" alt="Strawberry Jam" />
      </div>
      <p>Strawberry Jam</p>
      <p className="price">£2.45 per 340g</p>
      <div className="quantity-counter">
        <button className="quantity-btn" onClick={() => updateQuantity('jam', -1)}>-</button>
        <span className="quantity-display">{quantities['jam'] || 0}</span>
        <button className="quantity-btn" onClick={() => updateQuantity('jam', 1)}>+</button>
      </div>
      <button>Add to Cart</button>
    </div>

    <div className="breakfast-item">
      <div className="image-container">
        <img src="https://m.media-amazon.com/images/I/61B9UN6WIoL.jpg" alt="Honey" />
      </div>
      <p>Natural Honey</p>
      <p className="price">£4.50 per 500g</p>
      <div className="quantity-counter">
        <button className="quantity-btn" onClick={() => updateQuantity('honey', -1)}>-</button>
        <span className="quantity-display">{quantities['honey'] || 0}</span>
        <button className="quantity-btn" onClick={() => updateQuantity('honey', 1)}>+</button>
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

export default BreakfastPage;