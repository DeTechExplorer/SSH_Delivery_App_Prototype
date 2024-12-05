// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SnackPage from './components/snack';
import Login from './components/login'; // Import the Login component
import OrderConfirmation from './components/confirmation'; // Import the Order Confirmation component
import KitchenPage from './components/kitchen';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/category/snack">View Snack Products</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/order-confirmation">Order Confirmation</Link>
            </li>
            <li>
              <Link to="/category/kitchen">View Kitchen Staples</Link>
            </li>
          </ul>
        </nav>

        <Routes>
        <Route path="/login" element={<Login />} />


          <Route path="/order-confirmation" element={<OrderConfirmation />} />  
          <Route path="/category/snack" element={<SnackPage />} />
          <Route path="/category/kitchen" element={<KitchenPage />} />  
        </Routes>
      </div>
    </Router>
  );
}

export default App;