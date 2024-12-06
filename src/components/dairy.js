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
