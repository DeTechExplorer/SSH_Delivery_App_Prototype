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
              <Link to="/category/dairy">Dairy</Link> {/* Add dairy link */}
            </li>
            <li>
              <Link to="/category/beverages">Beverages</Link> {/* Add beverages link */}
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
          <Route path="/individualCart" element={<IndividualCartPage />} />
          <Route path="/sharedcart" element={<CartPage />} />
          <Route path="/promotions" element={<PromotionsPage />} />

          {/* Catch all route for 404 */}
          <Route path="*" element={<Navigate to="/homepage" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;