import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';  // Import necessary components
import BakeryPage from './components/bakery';
import BreakfastPage from './components/breakfast';

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
          </ul>
        </nav>

        {/* Define Routes */}
        <Routes>
          {/* Route for Bakery Page */}
          <Route path="/bakery" element={<BakeryPage />} />

          {/* Route for Breakfast Page */}
          <Route path="/breakfast" element={<BreakfastPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
