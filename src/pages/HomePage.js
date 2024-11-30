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
        </>
    );
}

export default HomePage;
