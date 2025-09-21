import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../API/endPoints";
import classes from "./Result.module.css";
import ProductCard from "../../Components/Product/ProductCard";
import Loder from "../../Components/Loader/Loader";

function Result() {
  const { categoryName } = useParams();
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const categoryMap = {
    "mens-clothing": "men's clothing",
    "womens-clothing": "women's clothing",
    electronics: "electronics",
    jewelery: "jewelery",
  };
  const apiCategory = categoryMap[categoryName] || categoryName;
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${productUrl}/products/category/${apiCategory}`)
      .then((res) => {
        setResult(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching category products:", err);
        setIsLoading(false);
      });
  }, [apiCategory]);

  return (
    <Layout>
      {isLoading ? (
        <Loder />
      ) : (
        <section>
          <h1 style={{ padding: "30px" }}>Results</h1>
          <p style={{ padding: "30px" }}>Category / {categoryName}</p>
          <hr />
          <div className={classes.products_container}>
            {result.length > 0 ? (
              result.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  renderAdd={true}
                />
              ))
            ) : (
              <p style={{ padding: "30px" }}>
                No products found in this category.
              </p>
            )}
          </div>
        </section>
      )}
    </Layout>
  );
}

export default Result;
