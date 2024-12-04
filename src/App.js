import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import InvoiceForm from './components/cardpayment';  // Import InvoiceForm
import FeedbackForm from './components/feedback';  // Import FeedbackForm

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/invoice">View Invoice Form</Link>  
            </li>
            <li>
              <Link to="/feedback">Give Feedback</Link>  
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<InvoiceForm />} />  
          <Route path="/invoice" element={<InvoiceForm />} />  
          <Route path="/feedback" element={<FeedbackForm />} />  
        </Routes>
      </div>
    </Router>
  );
}

export default App;
