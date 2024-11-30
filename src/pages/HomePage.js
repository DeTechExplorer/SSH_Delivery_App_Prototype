import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
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
            `}
          </style>

          <div className="location-bar">
            SSH Delivery
          </div>

          <header className="top-bar">
            <div className="top-buttons">
              <button>Shared Orders</button>
              <button>Individual Orders</button>
            </div>
          </header>

          <div className="logo-search-location">
            <div id="logo">
              <img src="./images/logo.png" alt="Logo" id="logo-img" />
            </div>
            <div id="search-box">
              <input type="text" placeholder="Search products..." />
            </div>
          </div>

          <div id="location-btn-container">
            <span id="location-text">Deliver to:</span>
            SSH Home London, UK
          </div>

          <section id="categories">
    <h2>Categories</h2>
    <div className="category-container">
        <div className="category-item">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHDKCfKLy97haAje1GyRM8plZt33nwF7nsMA&s" alt="Fruits & Vegetables" />
            <p>Fruits & Vegetables</p>
        </div>
        <div className="category-item">
            <img src="https://www.mishry.com/wp-content/uploads/2020/08/best-dairy-products.png" alt="Dairy" />
            <p>Dairy</p>
        </div>
        <div className="category-item">
            <img src="https://www.kateskitchenkc.com/wp-content/uploads/2022/12/breakfast-served-with-coffee-juice-egg-and-rolls.jpg_s1024x1024wisk20c81oJyNsUEkDZzX8Qf4kEuj3pnxPHHA5MLVeRzPEr-vQ.jpg" alt="Breakfast" />
            <p>Breakfast</p>
        </div>
        <div className="category-item">
            <img src="https://thumbs.dreamstime.com/b/cans-beverages-19492376.jpg" alt="Beverages" />
            <p>Beverages</p>
        </div>
        <div className="category-item">
            <img src="https://cdn.prod.website-files.com/63cf34956bc59159af577c42/63cf34956bc5912d47578a9b_Meat-%2525252526-Poultry-feature-image.jpeg" alt="Meat & Poultry" />
            <p>Meat & Poultry</p>
        </div>
        <div className="category-item">
            <img src="https://blog.dubailocal.ae/wp-content/uploads/2024/06/The-best-Bakeries-in-Dubai-for-enjoying-everything-from-luxury-cakes-to-sourdough.webp" alt="Bakery" />
            <p>Bakery</p>
        </div>
        <div className="category-item">
            <img src="https://www.timeoutdubai.com/cloud/timeoutdubai/2023/07/31/British-Snacks-in-Dubai.png" alt="Snacks" />
            <p>Snacks</p>
        </div>
        <div className="category-item">
            <img src="https://melissaknorris.com/wp-content/uploads/2022/04/Pantry-Staples_MKN-1024x683.jpg" alt="Kitchen Staples" />
            <p>Kitchen Staples</p>
        </div>
        <div className="category-item">
            <img src="https://img-cdn.thepublive.com/fit-in/1200x675/filters:format(webp)/afaqs/media/post_attachments/d57ad8883c24b96ed93aeb0e918b5bfc0b336a450fba1d15cc9a3f6f40c2e9ca.png" alt="Beauty & Personal Care" />
            <p>Beauty & Personal Care</p>
        </div>
    </div>
</section>

  <div className="bottom-nav">
            <button>Home</button>
            <div id="cart-btn">
              <img src="cart_image_url" alt="Cart" style={{ width: '120%', height: '120%' }} />
              Cart
            </div>
          </div>
        </>
    );
}


export default HomePage;
