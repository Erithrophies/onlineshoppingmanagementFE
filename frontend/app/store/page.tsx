import axios from "axios";
import ProductListClient from "./ProductListClient";


export default async function StorePage() {
  let products = [];

  try {
    const res = await axios.get("http://localhost:3000/products");
    products = res.data;
  } catch (err) {
    console.error("Failed to fetch products", err);
  }

  return <ProductListClient products={products} />;
}
