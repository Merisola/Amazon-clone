import React, { useContext, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import classes from "./Payment.module.css";
import { DataContext } from "../../Components/DataProvider/DataContext";
import ProductCard from "../../Components/Product/ProductCard";
import { CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { axiosInstance } from "../../API/Axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

function Payment() {
  const {
    state: { user, basket },
  } = useContext(DataContext);

  const totalItems = basket?.reduce((amount, item) => {
    return amount + item.amount;
  }, 0);

  const total = basket.reduce(
    (amount, item) => amount + item.price * item.amount,
    0
  );

  const navigate = useNavigate();

  
  const [cardError, setCardError] = useState(null);

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e.error.message) : setCardError("");
  };
  const stripe = useStripe();
  const element = useElements();

  const [processing, setProcessing] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);

      // 1. Ask backend for a PaymentIntent (send total in body)
      const response = await axiosInstance.post("/payment/create", {
        total: total,
      });

      // 2. Get clientSecret (make sure casing matches backend)
      const clientSecret = response.data.clientSecret;

      // 3. Confirm card payment on client
      // eslint-disable-next-line no-unused-vars
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: element.getElement(CardElement) },
      });

      // 4. After confirmation: save order, clear basket, navigate
      setProcessing(false);
      navigate("/orders", { state: { msg: "You have placed a new order" } });

      await setDoc(doc(db, "users", user.uid, "orders", paymentIntent.id), {
        basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });
    } catch (error) {
      console.error("Payment error:", error);
      setProcessing(false);
    }

    
  };


  return (
    <Layout>
      {/* Header */}
      <div className={classes.payment_header}>
        Check out ({totalItems}) {totalItems === 1 ? "item" : "items"}
      </div>
      {/* Payment method */}
      <section className={classes.payment}>
        {/* Address */}
        <div className={classes.flex}>
          <h3>Delivery Adress</h3>
          <div>
            <div>{user?.email || "Guest checkout"}</div>

            <div>{user?.email?.split("@")[0]}</div>
            <div>Chicago, L</div>
          </div>
        </div>
        <hr />

        <div className={classes.flex}>
          <h3>Review item and delivery</h3>
          <div>
            {basket?.map((item, i) => (
              <ProductCard product={item} flex={true} key={i} />
            ))}
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Payment method</h3>
          <div className={classes.payment_card_component}>
            <div className={classes.payment_details}>
              <form action="">
                {/* Error message */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* Payment card */}
                <CardElement onChange={handleChange} />

                <div className={classes.payment_price}>
                  <span style={{ display: "flex", gap: "5px" }}>
                    <p>Total order |</p>
                    <CurrencyFormat amount={total} />
                  </span>
                  <button onClick={handlePayment}>
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader size={12} color="gray" /> <p>Please wait</p>{" "}
                      </div>
                    ) : (
                      "Pay now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;
