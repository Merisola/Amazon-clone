import { useContext } from "react";
import Layout from "../../Components/Layout/Layout";
import { DataContext } from "../../Components/DataProvider/DataContext";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import ProductCard from "../../Components/Product/ProductCard";
import { Link } from "react-router-dom";
import classes from "./Cart.module.css";
import { Type } from "../../Utility/action.type";

import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

function Cart() {
  const { state, dispatch } = useContext(DataContext);
  const { basket } = state;
  const total = basket.reduce(
    (amount, item) => amount + item.price * item.amount,
    0
  );

  const Increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };
  const Decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASEKET,
      id,
    });
  };

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.cart_container}>
          <h2>Hello</h2>
          <h3>Your shopping basket </h3>
          <hr />
          {basket?.length === 0 ? (
            <p>Opps! No item in your cart</p>
          ) : (
            basket?.map((item) => {
              return (
                <section className={classes.cart_product} key={item.id}>
                  <ProductCard
                    renderAdd={false}
                    // key={i}
                    product={item}
                    renderDesc={true}
                    flex={true}
                  />
                  <div className={classes.button_container}>
                    <button
                      className={classes.btn}
                      onClick={() => Increment(item)}
                    >
                      <IoIosArrowUp size={30} />
                    </button>
                    <span>{item.amount}</span>
                    <button
                      className={classes.btn}
                      onClick={() => Decrement(item.id)}
                    >
                      <IoIosArrowDown size={30} />
                    </button>
                  </div>
                </section>
              );
            })
          )}
        </div>
        {basket?.length !== 0 && (
          <div className={classes.subtotal}>
            <div>
              <p>
                Subtotal ({basket?.length}{" "}
                {basket?.length === 1 ? "item" : "items"})
              </p>
              <CurrencyFormat amount={total} />
            </div>

            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>

            <Link to="/payments" className="checkout-button">
              Continue to checkout
            </Link>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Cart;
