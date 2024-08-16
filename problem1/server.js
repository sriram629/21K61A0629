const express = require("express");
const axios = require("axios");

const app = express();
const port = 3000;

async function fetchAccessToken() {
  try {
    const response = await axios.post("http://20.244.56.144/test/auth", {
      companyName: "shopify",
      clientID: "f1bc4e03-b072-4a5d-9ef8-8e02619f226e",
      clientSecret: "TSHwPmmnIIfwExAy",
      ownerName: "Sri Rama Krishna Chowdary",
      ownerEmail: "maddipatisriramakrishna@gmail.com",
      rollNo: "21K61A0629",
    });

    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw new Error("Failed to authenticate");
  }
}

async function fetchProducts(
  company,
  categoryname,
  minPrice,
  maxPrice,
  accessToken
) {
  try {
    const response = await axios.get(
      `http://20.244.56.144/test/companies/${company}/categories/${categoryname}/products`,
      {
        params: {
          minPrice,
          maxPrice,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.map((product) => ({
      ...product,
      id: generateId(company, product.productName),
    }));
  } catch (err) {
    console.log(err);
    return [];
  }
}

function generateId(company, productName) {
  return `${company}-${Buffer.from(productName).toString("base64")}`;
}

function quickSort(arr, left, right, sortKey, order) {
  if (left < right) {
    const pivotIndex = part(arr, left, right, sortKey, order);
    quickSort(arr, left, pivotIndex - 1, sortKey, order);
    quickSort(arr, pivotIndex + 1, right, sortKey, order);
  }
  return arr;
}

function part(arr, left, right, sortKey, order) {
  const pivot = arr[right];
  let i = left - 1;

  for (let j = left; j < right; j++) {
    if (
      order === "asc"
        ? arr[j][sortKey] <= pivot[sortKey]
        : arr[j][sortKey] >= pivot[sortKey]
    ) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
  return i + 1;
}

function sortProducts(products, sortKey, order = "asc") {
  if (sortKey) {
    quickSort(products, 0, products.length - 1, sortKey, order);
  }
  return products;
}

function pageProducts(products, page, pageSize) {
  const startIndex = (page - 1) * pageSize;
  return products.slice(startIndex, startIndex + pageSize);
}

app.get("/categories/:categoryname/products", async (req, res) => {
  const { categoryname } = req.params;
  const {
    top = 10,
    minPrice,
    maxPrice,
    sort,
    order = "asc",
    page = 1,
  } = req.query;

  const companies = ["AMZ", "ELE", "SUP", "HI", "ZEO"];

  try {
    const accessToken = await fetchAccessToken();

    const products = await Promise.all(
      companies.map((company) =>
        fetchProducts(company, categoryname, minPrice, maxPrice, accessToken)
      )
    );
    let allProducts = products.flat();
    allProducts = sortProducts(allProducts, sort, order);

    const paginatedProducts = pageProducts(
      allProducts,
      parseInt(page),
      parseInt(n)
    );

    res.json({ products: paginatedProducts });
  } catch (err) {
    res.status(500).json({ error: "Error fetching products" });
  }
});

app.get("/categories/:categoryname/products/:productid", async (req, res) => {
  const { productid } = req.params;

  try {
    const companies = ["AMZ", "ELE", "SUP", "HI", "ZEO"];
    const allProducts = await Promise.all(
      companies.map((company) =>
        fetchProducts(company, req.params.categoryname)
      )
    );

    const products = allProducts.flat();
    const product = products.find((p) => p.id === productid);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching product details" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
