import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import InvoiceForm from './components/cardpayment'; // Import InvoiceForm
import FeedbackForm from './components/feedback'; // Import FeedbackForm
import DairyPage from './components/dairy'; // Import DairyPage
function App() {
  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <nav>
          <ul>
            <li>
              <Link to="/invoice">View Invoice Form</Link> {/* Navigation to Invoice Form */}
            </li>
            <li>
              <Link to="/feedback">Give Feedback</Link> {/* Navigation to Feedback Form */}
            </li>
            <li>
              <Link to="/category/dairy">Dairy Products</Link> {/* Navigation to Dairy Products Page */}
            </li>
            
          </ul>
        </nav>

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<InvoiceForm />} /> {/* Default route to Invoice Form */}
          <Route path="/invoice" element={<InvoiceForm />} /> {/* Route for Invoice Form */}
          <Route path="/feedback" element={<FeedbackForm />} /> {/* Route for Feedback Form */}
          <Route path="/category/dairy" element={<DairyPage />} /> {/* Route for Dairy Products */}
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
