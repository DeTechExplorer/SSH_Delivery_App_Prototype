import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductsByCategory } from './productsData';
import logo from './images/LOGO.jpeg';

function BeveragesPage() {
  const [cartCount, setCartCount] = useState(0);  // Tracks the number of items in the cart
  const [quantities, setQuantities] = useState({});  // Tracks selected quantities for each product
  const [products, setProducts] = useState([]);  // Stores the list of fetched products
  const [loading, setLoading] = useState(true);  // Indicates if products are still being loaded
  const navigate = useNavigate();  // Hook for programmatic navigation
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductsByCategory('beverages');
        setProducts(data.products);  // Updates the products state with fetched data
      } catch (error) {
        console.error('Error fetching beverages products:', error);
      } finally {
        setLoading(false);  // Updates loading state once fetching is complete
      }
    };
  
    fetchProducts();  // Calls the fetch function when the component mounts
  }, []);
  const updateQuantity = (itemId, change) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + change)  // Ensures quantity is never negative
    }));
  };
  const handleAddToCart = (productId) => {
    const quantity = quantities[productId] || 0;  // Retrieves the quantity for the product
    if (quantity > 0) {
      setCartCount(prev => prev + quantity);  // Updates the cart count
      setQuantities(prev => ({
        ...prev,
        [productId]: 0  // Resets the quantity after adding to cart
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

    /* Other styles omitted for brevity */

  `}
</style>

};