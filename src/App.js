import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login'; // Import the Login component

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Set default route to show Login page */}
          <Route path="/" element={<Login />} /> {/* Home page showing Login */}
          <Route path="/login" element={<Login />} /> {/* Login page route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;