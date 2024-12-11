import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getProductsByCategory } from './productsData';
import Logo from '../images/logo.jpeg';

function MeatPoultryPage() {
    const [cartCount, setCartCount] = useState(0);
    const [addedItems, setAddedItems] = useState({}); 
    const [quantities, setQuantities] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    // Add new state for tracking both cart counts
  const [individualCartCount, setIndividualCartCount] = useState(0);
  const [sharedCartCount, setSharedCartCount] = useState(0);
  
 
 // Get isSharedOrder from location state
 const isSharedOrder = location.state?.isSharedOrder || false;
 
 useEffect(() => {
   const fetchProducts = async () => {
     try {
       const data = await getProductsByCategory('meat-poultry');
       setProducts(data.products);
     } catch (error) {
       console.error('Error fetching meat-poultry products:', error);
     } finally {
       setLoading(false);
     }
   };
 
   fetchProducts();
 }, []);
 
  // Load initial cart counts on component mount
  useEffect(() => {
     const sharedItems = JSON.parse(localStorage.getItem('sharedCartItems') || '[]');
     const individualItems = JSON.parse(localStorage.getItem('individualCartItems') || '[]');
     
     setSharedCartCount(sharedItems.reduce((total, item) => total + item.quantity, 0));
     setIndividualCartCount(individualItems.reduce((total, item) => total + item.quantity, 0));
   }, []);
 
   const updateQuantity = (itemId, change) => {
     setQuantities(prev => ({
       ...prev,
       [itemId]: Math.max(0, (prev[itemId] || 0) + change)
     }));
   };
 
 
  // Update handleAddToCart to handle shared/individual carts
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

       // Show "Added to cart" feedback
      setAddedItems(prev => ({
        ...prev,
        [productId]: true
      }));
  
      // Clear the feedback after 2 seconds
      setTimeout(() => {
        setAddedItems(prev => ({
          ...prev,
          [productId]: false
        }));
      }, 1000);
 
 
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
 
    // Update handleCartClick to route to correct cart
    const handleCartClick = () => {
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
    
            #meat-section {
                text-align: center;
                padding: 20px;
                margin-bottom: 80px;
            }
    
            #meat-section h2 {
                color: #3498db;
                margin-bottom: 20px;
            }
    
            .meat-container {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                justify-content: center;
                gap: 20px;
                max-width: 1000px;
                margin: 0 auto;
            }
    
            .meat-item {
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
    
            .meat-item:hover {
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
    
            .meat-item p {
                margin: 10px 0;
                color: #2c3e50;
                font-weight: bold;
            }
    
            .meat-item .price {
                color: #3498db;
                font-size: 18px;
            }
    
            .meat-item button {
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
    
            .meat-item button:hover {
                background-color: #2980b9;
            }
    
            /* Updated quantity counter styles */
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

            .bottom-nav button:hover {
              background-color: #2980b9;
            }
  
            #cart-btn img {
              max-height: 20px;
              margin-right: 10px;
            }
  
             .loading {
           text-align: center;
           padding: 20px;
           font-size: 1.2rem;
           color: #3498db;
         }

         .added-to-cart {
          background-color: #e2e8f0 !important;
          color: #718096 !important;
          position: relative;
        }
        
        .added-feedback {
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 12px;
          color: #718096;
          white-space: nowrap;
        }



         @media (max-width: 768px) {
           .dairy-container {
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
           .dairy-container {
             grid-template-columns: repeat(1, 1fr);
           }
         }
       `}
     </style>


          <div className="location-bar">
          SSH Home Delivers
      </div>
      <header className="top-bar">
        <div className="logo-search-location">
          <div id="logo">
            <img src={Logo} alt="Logo" id="logo-img" />
          </div>
          <div id="search-box">
            <input type="text" placeholder="Search meat and poultry items..." />
          </div>
        </div>
        <div id="location-btn-container">
          <span id="location-text">Deliver to:</span>
          <button id="location-btn">SSH Home London, UK</button>
        </div>
      </header>
      <section id="meat-section">
        <h2>Meat & Poultry Products</h2>
        {loading ? (
          <div className="loading">Loading meat & poultry products...</div>
        ) : (
            <div className="meat-container">
              {products.map(product => (
                <div key={product.id} className="meat-item">
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
                <button onClick={() => handleAddToCart(product.id)}
  className={addedItems[product.id] ? 'added-to-cart' : ''}
  disabled={addedItems[product.id]}
>
  {addedItems[product.id] ? 'Added to Cart' : 'Add to Cart'}
  {addedItems[product.id] && (
    <span className="added-feedback">Item added to cart</span>
  )}
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

export default MeatPoultryPage;
