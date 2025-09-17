// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./Pages/Login/Login";
// import Footer from "./Components/Footer/Footer";
// import Navbar from "./Components/Navbar/Navbar";
// import Categories from "./Components/CategoryTab/Categories";
// import Cards from "./Components/Cards/Cards";
// import Sell from "./Pages/Sell/Sell";
// import Home from "./Pages/Home/Home";
// import ProductDetails from "./Pages/ProductDetails/ProductDetails";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home/>} />
//         <Route path="/sell" element={<Sell />} />
//         <Route path="/ProductDetails" element={<ProductDetails />} />

//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sell from "./Pages/Sell/Sell";
import Home from "./Pages/Home/Home";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
