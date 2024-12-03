// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import BakeryPage from './components/bakery';
import BreakfastPage from './components/breakfast';
import FruitesAndVegPage from './components/fruitesandveg';  
import CartPage from './components/cart';
import Homepage from './components/homepage';
import PromotionsPage from './components/promotions';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation links to switch between pages */}
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
              <Link to="/category/fruitsandvegs">Fruits and Vegetables</Link> 
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/promotions">Promotions</Link> 
            </li>
          </ul>
        </nav>

        <Routes>
          {/* Default redirect to homepage */}
          <Route path="/" element={<Homepage />} />
          
          {/* Main routes */}
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/category/bakery" element={<BakeryPage />} />
          <Route path="/category/breakfast" element={<BreakfastPage />} />
          <Route path="/category/fruits-vegetables" element={<FruitesAndVegPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/promotions" element={<PromotionsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;