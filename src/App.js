import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';  
import BakeryPage from './components/bakery';  // Corrected path
import BreakfastPage from './components/breakfast';  // Corrected path
import FruitesAndVegPage from './components/fruitesandveg';  // Corrected path

import Homepage from './components/homepage';  // Corrected path

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation links to switch between pages */}
        <nav>
          <ul>
            <li>
              <Link to="/bakery">Bakery</Link>
            </li>
            <li>
              <Link to="/breakfast">Breakfast</Link>
            </li>
            <li>
              <Link to="/fruitesandveg">Fruits and Vegetables</Link> 
            </li>
            <li>
              <Link to="/homepage">Homepage</Link>
            </li>
          </ul>
        </nav>

        {/* Define Routes for all the components */}
        <Routes>
          {/* Route for Bakery Page */}
          <Route path="/bakery" element={<BakeryPage />} />

          {/* Route for Breakfast Page */}
          <Route path="/breakfast" element={<BreakfastPage />} />

          {/* Route for Fruits and Vegetables Page */}
          <Route path="/fruitesandveg" element={<FruitesAndVegPage />} /> 

         

          {/* Route for Homepage */}
          <Route path="/homepage" element={<Homepage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
