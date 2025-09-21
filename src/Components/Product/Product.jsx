import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from "./Product.module.css";
import Loder from "../Loader/Loader";

function Product() {
  const [products, setProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);
  return (
    <div>
      <section className={classes.product_container}>
        {isLoading ? (
          <Loder />
        ) : (
          products.map((singleProduct) => {
            return (
              <ProductCard
                product={singleProduct}
                key={singleProduct.id}
                renderAdd={true}
              />
            );
          })
        )}
      </section>
    </div>
  );
}

export default Product;
