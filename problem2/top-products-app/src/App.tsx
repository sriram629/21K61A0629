import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AllProducts from "./pages/AllProducts";
import ProductsPage from "./pages/ProductsPage";

const App: React.FC = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<AllProducts />} />
      <Route path="/product/:id" element={<ProductsPage />} />
    </Routes>
  </Router>
);

export default App;
