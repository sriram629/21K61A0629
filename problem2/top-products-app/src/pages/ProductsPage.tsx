import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/:companyname/:categoryname/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (!product) return <div>Product not found</div>;

  return (
    <div className="p-4">
      <div className="flex">
        <img
          className="w-1/2 h-auto object-cover"
          src={product.image}
          alt={product.name}
        />
        <div className="ml-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600">Company: {product.company}</p>
          <p className="text-gray-800">Category: {product.category}</p>
          <p className="text-gray-800">Price: ${product.price.toFixed(2)}</p>
          <p className="text-yellow-500">Rating: {product.rating}</p>
          <p className="text-red-500">Discount: {product.discount}%</p>
          <p className={`text-${product.availability ? "green" : "red"}-500`}>
            {product.availability ? "In Stock" : "Out of Stock"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
