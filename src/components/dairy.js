import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductsByCategory } from './productsData';
import logo from './images/LOGO.jpeg';
useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductsByCategory('dairy');
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching dairy products:', error);
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