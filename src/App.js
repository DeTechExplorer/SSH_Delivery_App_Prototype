import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import BakeryPage from './components/bakery';
import BreakfastPage from './components/breakfast';
import FruitesAndVegPage from './components/fruitesandveg';  
import IndividualCartPage from './components/individualCart';
import CartPage from './components/sharedcart';
import Homepage from './components/homepage';
import PromotionsPage from './components/promotions';
import DairyPage from './components/dairy';
import BeveragesPage from './components/beverages'; 
import BeautyPage from './components/beauty';
import KitchenPage from './components/kitchen';
import SnackPage from './components/snacks';
import MeatPoultryPage from './components/meatandpoultry';
import Checkout from './components/checkout';
import OrderConfirmation from './components/orderConfirmation';
import FeedbackForm from './components/feedback';
import InvoiceForm from './components/invoiceForm';
import MyOrdersPage from './components/myorders';


function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
          
            
          </ul>
        </nav>

        <Routes>
          {/* Default redirect to homepage */}
          <Route path="/" element={<Navigate to="/homepage" replace />} />
          
          {/* Main routes */}
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/category/bakery" element={<BakeryPage />} />
          <Route path="/category/breakfast" element={<BreakfastPage />} />
          <Route path="/category/fruits-vegetables" element={<FruitesAndVegPage />} />
          <Route path="/category/dairy" element={<DairyPage />} /> 
          <Route path="/category/beverages" element={<BeveragesPage />} /> 
          <Route path="/category/beauty-personal-care" element={<BeautyPage />} />
          <Route path="/individualCart" element={<IndividualCartPage />} />
          <Route path="/sharedcart" element={<CartPage />} />
          <Route path="/promotions" element={<PromotionsPage />} />
          <Route path="/category/kitchen-staples" element={<KitchenPage />} />
          <Route path="/category/snacks" element={<SnackPage />} />
          <Route path="/category/meat-poultry" element={<MeatPoultryPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<OrderConfirmation />} />
          <Route path="/feedback" element={<FeedbackForm />} />
          <Route path="/invoice" element={<InvoiceForm />} />
          <Route path="/myorders" element={<MyOrdersPage />} />

          {/* Catch all route for 404 */}
          <Route path="*" element={<Navigate to="/homepage" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;