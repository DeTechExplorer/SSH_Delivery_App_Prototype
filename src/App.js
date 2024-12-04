// // import React from 'react';
// // import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// // import Login from './components/login'; // Import the Login component

// // function App() {
// //   return (
// //     <Router>
// //       <div>
// //         <Routes>
// //           {/* Set default route to show Login page */}
// //           <Route path="/" element={<Login />} /> {/* Home page showing Login */}
// //           <Route path="/login" element={<Login />} /> {/* Login page route */}
// //         </Routes>
// //       </div>
// //     </Router>
// //   );
// // }
// // export default App;

// // import React from "react";
// // import OrderConfirmation from "./components/confirmation";

// // const App = () => {
// //   return (
// //     <div>
// //       {/* Render the Order Confirmation page */}
// //       <OrderConfirmation />
// //     </div>
// //   );
// // };

// // export default App;

// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Login from "./components/login"; // Import the Login component
// import OrderConfirmation from "./components/confirmation"; // Import the Order Confirmation component

// function App() {
//   return (
//     <Router>
//       <div>
//         <Routes>
//           {/* Default route to show Login page */}
//           <Route path="/" element={<Login />} />
//           {/* Login page route */}
//           <Route path="/login" element={<Login />} />
//           {/* Order Confirmation page route */}
//           <Route path="/order-confirmation" element={<OrderConfirmation />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';  
import Login from './components/login'; // Import the Login component
import OrderConfirmation from './components/confirmation'; // Import the Order Confirmation component

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation links to switch between pages */}
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/order-confirmation">Order Confirmation</Link>
            </li>
          </ul>
        </nav>

        {/* Define Routes */}
        <Routes>
          {/* Route for Login Page */}
          <Route path="/login" element={<Login />} />

          {/* Route for Order Confirmation Page */}
          <Route path="/order-confirmation" element={<OrderConfirmation />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
