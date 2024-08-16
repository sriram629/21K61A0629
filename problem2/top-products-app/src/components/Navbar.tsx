import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => (
  <nav className="bg-blue-600 p-4 text-white">
    <div className="container mx-auto flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        Top Products
      </Link>
      <div>
        <Link to="/" className="mr-4">
          All Products
        </Link>
        <Link to="/product/1">Product Details</Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
