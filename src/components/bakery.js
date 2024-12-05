import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getProductsByCategory } from './productsData'; // Make sure to import the correct function
import Logo from '../images/logo.jpeg';

function BakeryPage() {
  const [cartCount, setCartCount] = useState(0);
  const [quantities, setQuantities] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Add new state for tracking both cart counts
const [individualCartCount, setIndividualCartCount] = useState(0);
const [sharedCartCount, setSharedCartCount] = useState(0);


  // Get isSharedOrder from location state passed from HomePage
  const isSharedOrder = location.state?.isSharedOrder || false;


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductsByCategory('bakery');
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching bakery products:', error);
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

  // Modify handleAddToCart
const handleAddToCart = (productId) => {
  const quantity = quantities[productId] || 0;
  if (quantity > 0) {
    const product = products.find(p => p.id === productId);
    
    const newItem = {
      id: productId,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    };

    // Update the appropriate cart count based on order type
    if (isSharedOrder) {
      setSharedCartCount(prev => prev + quantity);
      // Save shared cart items in localStorage
      const currentSharedItems = JSON.parse(localStorage.getItem('sharedCartItems') || '[]');
      const updatedSharedItems = addOrUpdateItem(currentSharedItems, newItem);
      localStorage.setItem('sharedCartItems', JSON.stringify(updatedSharedItems));
    } else {
      setIndividualCartCount(prev => prev + quantity);
      // Save individual cart items in localStorage
      const currentIndividualItems = JSON.parse(localStorage.getItem('individualCartItems') || '[]');
      const updatedIndividualItems = addOrUpdateItem(currentIndividualItems, newItem);
      localStorage.setItem('individualCartItems', JSON.stringify(updatedIndividualItems));
    }
    
    // Reset quantity after adding to cart
    setQuantities(prev => ({
      ...prev,
      [productId]: 0
    }));
  }
};

// Helper function to add or update item in cart
const addOrUpdateItem = (currentItems, newItem) => {
  const existingItemIndex = currentItems.findIndex(item => item.id === newItem.id);
  
  if (existingItemIndex !== -1) {
    // Update quantity if item exists
    const updatedItems = [...currentItems];
    updatedItems[existingItemIndex].quantity += newItem.quantity;
    return updatedItems;
  } else {
    // Add new item if it doesn't exist
    return [...currentItems, newItem];
  }
};

// Load initial cart counts on component mount
useEffect(() => {
  const sharedItems = JSON.parse(localStorage.getItem('sharedCartItems') || '[]');
  const individualItems = JSON.parse(localStorage.getItem('individualCartItems') || '[]');
  
  setSharedCartCount(sharedItems.reduce((total, item) => total + item.quantity, 0));
  setIndividualCartCount(individualItems.reduce((total, item) => total + item.quantity, 0));
}, []);



  const handleCartClick = () => {
    // Use the same logic as HomePage
    if (isSharedOrder) {
      navigate('/sharedcart');
    } else {
      navigate('/individualCart');
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
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

          #bakery-section {
            text-align: center;
            padding: 20px;
            margin-bottom: 80px;
          }

          #bakery-section h2 {
            color: #3498db;
            margin-bottom: 20px;
          }

          .bakery-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            justify-content: center;
            gap: 20px;
            max-width: 1000px;
            margin: 0 auto;
          }

          .bakery-item {
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

          .bakery-item:hover {
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

          .quantity-counter {
            display: flex;
            align-items: center;
            gap: 8px;
            margin: 10px 0;
          }

          .quantity-btn {
            background-color: #3498db;
            color: white;
            border: none;
            width: 18px;
            height: 18px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.3s;
            padding: 0;
            line-height: 1;
          }

          .quantity-btn:hover {
            background-color: #2980b9;
          }

          .quantity-display {
            font-size: 14px;
            font-weight: bold;
            color: #2c3e50;
            min-width: 20px;
            text-align: center;
          }

          .bakery-item p {
            margin: 10px 0;
            color: #2c3e50;
            font-weight: bold;
          }

          .bakery-item .price {
            color: #3498db;
            font-size: 18px;
          }

          .bakery-item button {
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

          .bakery-item button:hover {
            background-color: #2980b9;
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
            .bakery-container {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (max-width: 480px) {
            .bakery-container {
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
            <img src="/api/placeholder/130/130" alt="Logo" id="logo-img" />
          </div>
          <div id="search-box">
            <input type="text" placeholder="Search bakery items..." />
          </div>
        </div>
        <div id="location-btn-container">
          <span id="location-text">Deliver to:</span>
          <button id="location-btn">SSH Home London, UK</button>
        </div>
      </header>

      <section id="bakery-section">
        <h2>Bakery Products</h2>
        {loading ? (
          <div className="loading">Loading bakery products...</div>
        ) : (
          <div className="bakery-container">
            {products.map(product => (
              <div key={product.id} className="bakery-item">
                <div className="image-container">
                  <img src={product.image} alt={product.name} />
                </div>
                <p>{product.name}</p>
                <p className="price">£{product.price.toFixed(2)} per {product.unit}</p>
                <div className="quantity-counter">
                  <button 
                    className="quantity-btn" 
                    onClick={() => updateQuantity(product.id, -1)}
                  >
                    -
                  </button>
                  <span className="quantity-display">
                    {quantities[product.id] || 0}
                  </span>
                  <button 
                    className="quantity-btn" 
                    onClick={() => updateQuantity(product.id, 1)}
                  >
                    +
                  </button>
                </div>
                <button onClick={() => handleAddToCart(product.id)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="bottom-nav">
        <button onClick={() => navigate('/categories')}>Categories</button>
        <button onClick={() => navigate('/', { state: { isSharedOrder } })}>Home</button>
        <button id="cart-btn" onClick={handleCartClick}>
          <img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" alt="Cart" />
          Cart ({isSharedOrder ? sharedCartCount : individualCartCount}) 
          {isSharedOrder && '(Shared)'}
        </button>
      </div>
    </>
  );
}

export default BakeryPage;


      