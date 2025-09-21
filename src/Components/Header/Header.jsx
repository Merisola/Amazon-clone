import React from "react";
import { IoSearch } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import classes from "./Header.module.css";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataContext";
import { useContext } from "react";
import { BiBasket } from "react-icons/bi";


function Header() {
   const {
     state: { basket }
   } = useContext(DataContext);

   const totalItems = basket?.reduce((amount, item) => {
     return amount + item.amount;
   }, 0);


  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header_container}>
          {/* Logo */}
          <div className={classes.logo_container}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="Amazon logo"
              />
            </Link>
            {/* Delivery */}
            <div className={classes.delivery}>
              <span>
                <CiLocationOn />
              </span>
              <div>
                <p>Deliver to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>
          <div className={classes.search}>
            {/* Search */}
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" name="" id="" placeholder="product search" />
            {/* icon */}
            <IoSearch size={25} />
          </div>
          {/* Right side link */}
          <div className={classes.order_container}>
            <a href="" className={classes.language}>
              <img
                src="https://media.flaticon.com/dist/min/img/flags/en.svg"
                alt="US flag"
              />
              <select>
                <option value="">EN</option>
              </select>
            </a>
            <Link to="/auth">
              <div>
                <p>Sign In</p>
                <span>Account and Lists</span>
              </div>
            </Link>
            {/* Orders */}
            <Link to="/orders">
              <p>returns</p>
              <span>and Orders</span>
            </Link>
            {/* cart */}
            <Link to="/cart" className={classes.cart}>
              <span>{totalItems}</span>
              <IoCartOutline size={35} />
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
}

export default Header;
