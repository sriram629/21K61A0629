import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";
import Sidebar from "../components/Sidebar";
import Dropdown from "../components/Dropdown";
import Page from "../components/page";

const AllProducts: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/categories/:categoryname/products"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <Dropdown />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {products.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
        <Page />
      </div>
    </div>
  );
};

export default AllProducts;
