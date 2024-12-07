import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import InvoiceForm from './components/cardpayment';
import FeedbackForm from './components/feedback'; 
import DairyPage from './components/dairy'; 
import BeautyPage from './components/beauty';
import BeveragesPage from './components/beverages';

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
           <li>
             <Link to="/category/dairy">Dairy Products</Link> 
           </li>
           <li>
             <Link to="/category/beauty">Beauty Products</Link>  
           </li>
           <li>
             <Link to="/category/beverages">Beverages</Link>  
           </li>
         </ul>
       </nav>

       <Routes>
         <Route path="/" element={<InvoiceForm />} /> 
         <Route path="/invoice" element={<InvoiceForm />} /> 
         <Route path="/feedback" element={<FeedbackForm />} /> 
         <Route path="/category/dairy" element={<DairyPage />} /> 
         <Route path="/category/beauty" element={<BeautyPage />} />  
         <Route path="/category/beverages" element={<BeveragesPage />} />  
       </Routes>
     </div>
   </Router>
 );
}

export default App;





