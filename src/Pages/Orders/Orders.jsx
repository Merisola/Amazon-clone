import React, { useContext, useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import classes from "./Orders.module.css";
import { DataContext } from "../../Components/DataProvider/DataContext";
import { db } from "../../Utility/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import ProductCard from "../../Components/Product/ProductCard";

function Orders() {
  const { state } = useContext(DataContext);
  const { user } = state;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const ordersRef = collection(db, "users", user.uid, "orders");
      const q = query(ordersRef, orderBy("created", "desc"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const ordersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersData);
      });

      return () => unsubscribe();
    }
  }, [user]);

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Your Orders</h2>
          {
            orders?.length == 0 && <div>You don't have orders yet.</div>
          }
          <div>
            {orders?.map((eachOrder, i) => {
              return (
                <div key={i}>
                  <hr />
                  <p>Order Id: {eachOrder?.id}</p>
                  {eachOrder?.basket?.map((item) => (
                    <ProductCard product={item} flex={true} key={item.id} />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Orders;
