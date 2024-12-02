import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';  
import BakeryPage from './components/bakery';
import BreakfastPage from './components/breakfast';
import FruitesAndVegPage from './components/fruitesandveg';  

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
          </ul>
        </nav>

        {/* Define Routes */}
        <Routes>
          {/* Route for Bakery Page */}
          <Route path="/bakery" element={<BakeryPage />} />

          {/* Route for Breakfast Page */}
          <Route path="/breakfast" element={<BreakfastPage />} />

          {/* Route for Fruits and Vegetables Page */}
          <Route path="/fruitesandveg" element={<FruitesAndVegPage/>} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
