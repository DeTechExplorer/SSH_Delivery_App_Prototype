// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SnackPage from './components/snack';


function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/category/snack">View Snack Products</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<DairyPage />} />
          <Route path="/category/snack" element={<SnackPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;