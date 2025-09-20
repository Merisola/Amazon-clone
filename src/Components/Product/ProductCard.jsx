import React from "react";
import Rating from "@mui/material/Rating";
import classes from "./Product.module.css";
import { Link } from "react-router-dom";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
const ProductCard = ({ product, flex }) => {
  const { id, image, title, rating, price } = product;
  return (
    <div
      className={`${classes.card_container}  ${
        flex ? classes.product_flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div>
        <h3>{title}</h3>
        <div className={classes.rating}>
          {/* rating */}
          <Rating value={rating?.rate || 0} precision={0.1} />
          <small>{rating?.count}</small>
          {/*price */}
        </div>
        <div className={classes.price}>
          {/* price */}
          <CurrencyFormat amount={price} />
        </div>
        <button className={classes.button}>Add to cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
