import React from "react";

interface CardProps {
  product: {
    id: string;
    name: string;
    company: string;
    category: string;
    price: number;
    rating: number;
    discount: number;
    availability: boolean;
    image: string;
  };
}

const Card: React.FC<CardProps> = ({ product }) => (
  <div className="bg-white border rounded-lg shadow-md overflow-hidden">
    <img
      className="w-full h-48 object-cover"
      src={product.image}
      alt={product.name}
    />
    <div className="p-4">
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p className="text-gray-600">{product.company}</p>
      <p className="text-gray-800">${product.price.toFixed(2)}</p>
      <p className="text-yellow-500">Rating: {product.rating}</p>
    </div>
  </div>
);

export default Card;
