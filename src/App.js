import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';  // Import necessary components
import BakeryPage from './components/bakery';
import BreakfastPage from './components/breakfast';
import FruitsAndVegPage from './components/fruitsandveg';  // Import your new Fruits and Veg component

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
              <Link to="/fruitsandveg">Fruits & Vegetables</Link> {/* New link */}
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
          <Route path="/fruitsandveg" element={<FruitsAndVegPage />} /> {/* New route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
