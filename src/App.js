import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import BakeryPage from './components/bakery';
import BreakfastPage from './components/breakfast';
import FruitesAndVegPage from './components/fruitesandveg';  
import IndividualCartPage from './components/individualCart';
import CartPage from './components/sharedcart';
import Homepage from './components/homepage';
import PromotionsPage from './components/promotions';
import DairyPage from './components/dairy';
import BeveragesPage from './components/beverages'; 
import BeautyPage from './components/beauty';
import KitchenPage from './components/kitchen';
import SnackPage from './components/snacks';
import MeatPoultryPage from './components/meatandpoultry';
import Checkout from './components/checkout';
import OrderConfirmation from './components/orderConfirmation';


function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/homepage">Homepage</Link>
            </li>
            <li>
              <Link to="/category/bakery">Bakery</Link>
            </li>
            <li>
              <Link to="/category/breakfast">Breakfast</Link>
            </li>
            <li>
              <Link to="/category/fruits-vegetables">Fruits and Vegetables</Link> 
            </li>
            <li>
              <Link to="/category/dairy">Dairy</Link> 
            </li>
            <li>
              <Link to="/category/beverages">Beverages</Link> 
            </li>
            <li>
            <Link to="/category/beauty-personal-care">Beauty & Personal Care</Link>
            </li>
            <li>
            <Link to="/category/kitchen">kitchen-staples</Link>
            </li>
            <li>
            <Link to="/category/snacks">Snacks</Link> 
            </li>
            <li>
              <Link to="/category/meat-poultry">Meat & Poultry</Link> 
            </li>
            <li>
              <Link to="/individualCart">IndividualCartPage</Link>
            </li>
            <li>
              <Link to="/promotions">Promotions</Link> 
            </li>
            <li>
              <Link to="/sharedcart">CartPage</Link>
            </li>
            <li>
              <Link to="/checkout">Checkout</Link>
            </li>
            <li>
              <Link to="/confirmation">Order Confirmation</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          {/* Default redirect to homepage */}
          <Route path="/" element={<Navigate to="/homepage" replace />} />
          
          {/* Main routes */}
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/category/bakery" element={<BakeryPage />} />
          <Route path="/category/breakfast" element={<BreakfastPage />} />
          <Route path="/category/fruits-vegetables" element={<FruitesAndVegPage />} />
          <Route path="/category/dairy" element={<DairyPage />} /> 
          <Route path="/category/beverages" element={<BeveragesPage />} /> 
          <Route path="/category/beauty-personal-care" element={<BeautyPage />} />
          <Route path="/individualCart" element={<IndividualCartPage />} />
          <Route path="/sharedcart" element={<CartPage />} />
          <Route path="/promotions" element={<PromotionsPage />} />
          <Route path="/category/kitchen-staples" element={<KitchenPage />} />
          <Route path="/category/snacks" element={<SnackPage />} />
          <Route path="/category/meat-poultry" element={<MeatPoultryPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<OrderConfirmation />} />

          {/* Catch all route for 404 */}
          <Route path="*" element={<Navigate to="/homepage" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;