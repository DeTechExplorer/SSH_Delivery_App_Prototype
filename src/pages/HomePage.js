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
        </>
    );
}

export default HomePage;
