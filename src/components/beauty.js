import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductsByCategory } from './productsData';
import logo from './images/LOGO.jpeg';

function BeautyPage() {
    const [cartCount, setCartCount] = useState(0);
    const [quantities, setQuantities] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const data = await getProductsByCategory('beauty-personal-care');
            setProducts(data.products);
          } catch (error) {
            console.error('Error fetching beauty products:', error);
          } finally {
            setLoading(false);
          }
        };
      
      
        fetchProducts();
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
      <style>
    {`
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #e8f4fa;
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

      #beauty-section {
        text-align: center;
        padding: 20px;
        margin-bottom: 80px;
      }

      #beauty-section h2 {
        color: #3498db;
        margin-bottom: 20px;
      }

      .beauty-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        justify-content: center;
        gap: 20px;
        max-width: 1000px;
        margin: 0 auto;
      }
    `}
  </style>
};
    