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
    };      
    