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
};