import React from 'react';
import './App.css';
import InvoiceForm from './components/cardpayment';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DairyPage from './components/dairy'; 

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          {/* Define routes for different pages */}
          <Routes>
            <Route path="/" element={<InvoiceForm />} /> {/* Default route */}
            <Route path="/dairy" element={<DairyPage />} /> {/* DairyPage route */}
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
