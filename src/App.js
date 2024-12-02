// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import BakeryPage from './components/bakery';
import BreakfastPage from './components/breakfast';
import FruitesAndVegPage from './components/fruitesandveg';
import CartPage from './components/cart';
import Homepage from './components/homepage';
import DairyPage from './components/dairy';
import BeveragesPage from './components/beverages';
import SnacksPage from './components/snacks';
import KitchenStaplesPage from './components/kitchenstaples';
import BeautyPersonalCarePage from './components/beauty';


function App() {
  return (
    <Router>
      <Routes>
        {/* Default route redirects to homepage */}
        <Route path="/" element={<Navigate to="/homepage" replace />} />
        
        {/* Main homepage */}
        <Route path="/homepage" element={<Homepage />} />

        {/* Category routes */}
        <Route path="/category">
          <Route path="bakery" element={<BakeryPage />} />
          <Route path="breakfast" element={<BreakfastPage />} />
          <Route path="fruits-vegetables" element={<FruitesAndVegPage />} />
          <Route path="dairy" element={<DairyPage />} />
          <Route path="beverages" element={<BeveragesPage />} />
          <Route path="snacks" element={<SnacksPage />} />
          <Route path="kitchen-staples" element={<KitchenStaplesPage />} />
          <Route path="beauty-personal-care" element={<BeautyPersonalCarePage />} />
        </Route>

        {/* Cart page */}
        <Route path="/cart" element={<CartPage />} />

        {/* Legacy routes for backward compatibility */}
        <Route path="/bakery" element={<Navigate to="/category/bakery" replace />} />
        <Route path="/breakfast" element={<Navigate to="/category/breakfast" replace />} />
        <Route path="/fruitesandveg" element={<Navigate to="/category/fruits-vegetables" replace />} />
      </Routes>
    </Router>
  );
}

export default App;