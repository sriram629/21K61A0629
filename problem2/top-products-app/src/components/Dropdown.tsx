import React from "react";

const Dropdown: React.FC = () => (
  <div className="bg-white border rounded-md shadow-sm">
    <select className="p-2 border-gray-300 rounded-md">
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="rating">Rating</option>
      <option value="discount">Discount</option>
    </select>
  </div>
);

export default Dropdown;
