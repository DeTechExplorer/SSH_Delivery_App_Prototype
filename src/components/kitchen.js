import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductsByCategory } from './productsData';
import logo from '../images/logo.jpeg';

function KitchenPage() {
    const [cartCount, setCartCount] = useState(0);
    const [quantities, setQuantities] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const data = await getProductsByCategory('snacks'); // Fetch snack products
            setProducts(data.products);
          } catch (error) {
            console.error('Error fetching snack products:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchProducts();
      }, []);
      const updateQuantity = (itemId, change) => {
        setQuantities(prev => ({
          ...prev,
          [itemId]: Math.max(0, (prev[itemId] || 0) + change),
        }));
      };
    
      const handleAddToCart = (productId) => {
        const quantity = quantities[productId] || 0;
        if (quantity > 0) {
          setCartCount(prev => prev + quantity);
          setQuantities(prev => ({
            ...prev,
            [productId]: 0,
          }));
        }
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
        #kitchen-section {
            text-align: center;
            padding: 20px;
            margin-bottom: 80px;
        }

        #kitchen-section h2 {
            color: #3498db;
            margin-bottom: 20px;
        }

        .kitchen-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            justify-content: center;
            gap: 20px;
            max-width: 1000px;
            margin: 0 auto;
        }

        .kitchen-item {
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

        .kitchen-item:hover {
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
         .kitchen-item p {
            margin: 10px 0;
            color: #2c3e50;
            font-weight: bold;
        }

        .kitchen-item .price {
            color: #3498db;
            font-size: 18px;
        }

        .kitchen-item button {
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

        .kitchen-item button:hover {
            background-color: #2980b9;
        }
            .quantity-counter {
            display: flex;
            align-items: center;
            gap: 8px;  /* Reduced gap */
            margin: 10px 0;
        }

        .quantity-btn {
            background-color: #3498db;
            color: white;
            border: none;
            width: 18px;  /* Made smaller and equal to height */
            height: 18px;  /* Made smaller and equal to width */
            border-radius: 4px;  /* Changed from 50% to 4px for squared look */
            cursor: pointer;
            font-size: 12px;  /* Reduced font size */
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.3s;
            padding: 0;  /* Remove padding */
            line-height: 1;  /* Ensure proper vertical centering */
        }

        .quantity-btn:hover {
            background-color: #2980b9;
        }

        .quantity-display {
            font-size: 14px;
            font-weight: bold;
            color: #2c3e50;
            min-width: 20px;  /* Slightly reduced */
            text-align: center;
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
            .kitchen-container {
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
            .kitchen-container {
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
            <img src={logo} alt="Logo" id="logo-img" />
          </div>
          <div id="search-box">
            <input type="text" placeholder="Search kitchen items..." />
          </div>
        </div>
        <div id="location-btn-container">
          <span id="location-text">Deliver to:</span>
          <button id="location-btn">SSH Home London, UK</button>
        </div>
      </header>
      <section id="kitchen-section">
        <h2>Kitchen Staples</h2>
        <div class="kitchen-container">
            <div class="kitchen-item">
                <div class="image-container">
                    <img src="https://digitalcontent.api.tesco.com/v2/media/ghs/5327232e-3cc0-465d-8796-c3a29b0fbd54/013d5947-1aec-4685-9eb4-2e6026811dab_1338076631.jpeg?h=960&w=960" alt="Rice">
                </div>
                <p>Rice(1kg)</p>
                <p class="price">£5.00</p>
                <div class="quantity-counter">
                    <button class="quantity-btn" onclick="updateQuantity(this, -1)">-</button>
                    <span class="quantity-display">0</span>
                    <button class="quantity-btn" onclick="updateQuantity(this, 1)">+</button>
                </div>
                <button>Add to Cart</button>
            </div>
            <div class="kitchen-item">
                <div class="image-container">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1N3_D5W8NBdYPWPWy9yZHJrIDN439ZvtugQ&s" alt="Wheat Flour">
                </div>
                <p>Wheat Flour(1kg)</p>
                <p class="price">£4.50</p>
                <div class="quantity-counter">
                    <button class="quantity-btn" onclick="updateQuantity(this, -1)">-</button>
                    <span class="quantity-display">0</span>
                    <button class="quantity-btn" onclick="updateQuantity(this, 1)">+</button>
                </div>
                <button>Add to Cart</button>
            </div>
            <div class="kitchen-item">
                <div class="image-container">
                    <img src="https://www.b-kosher.co.uk/wp-content/uploads/2022/08/Caster-Sugar-1kg-900x1200px.jpg" alt="Sugar (1kg)">
                </div>
                <p>Sugar (1kg)</p>
                <p class="price">£1.75</p>
                <div class="quantity-counter">
                    <button class="quantity-btn" onclick="updateQuantity(this, -1)">-</button>
                    <span class="quantity-display">0</span>
                    <button class="quantity-btn" onclick="updateQuantity(this, 1)">+</button>
                </div>
                <button>Add to Cart</button>
            </div>
            <div class="kitchen-item">
                <div class="image-container">
                    <img src="https://digitalcontent.api.tesco.com/v2/media/ghs/85729c2c-97c3-4222-8c8d-7066855ca1f1/07ccf92a-ea1b-42b4-8bbd-0761f694a2f1_1990808342.jpeg?h=960&w=960" alt="Salt (350g)">
                </div>
                <p>Salt (350g)</p>
                <p class="price">£1.00</p>
                <div class="quantity-counter">
                    <button class="quantity-btn" onclick="updateQuantity(this, -1)">-</button>
                    <span class="quantity-display">0</span>
                    <button class="quantity-btn" onclick="updateQuantity(this, 1)">+</button>
                </div>
                <button>Add to Cart</button>
            </div>