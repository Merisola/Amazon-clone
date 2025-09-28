import React from "react";
import Layout from "../../Components/Layout/Layout";
import classes from "./Orders.module.css";

function Orders() {
  // Hardcoded orders because I don't have firestore access because of billing.
  const orders = [
    {
      id: 1,
      itemName: "Wireless Headphones",
      price: "$120",
      date: "2025-09-20",
      status: "Delivered",
    },
    {
      id: 2,
      itemName: "Smartphone Case",
      price: "$25",
      date: "2025-09-25",
      status: "Shipped",
    },
    {
      id: 3,
      itemName: "Laptop Stand",
      price: "$45",
      date: "2025-09-26",
      status: "Processing",
    },
  ];

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Your Orders</h2>
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} className={classes.order_card}>
                <p>
                  <strong>{order.itemName}</strong>
                </p>
                <p>Price: {order.price}</p>
                <p>Date: {order.date}</p>
                <p
                  className={`${
                    classes.order_status
                  } ${order.status.toLowerCase()}`}
                >
                  {order.status}
                </p>
              </div>
            ))
          ) : (
            <p>No orders yet.</p>
          )}
        </div>
      </section>
    </Layout>
  );
}

export default Orders;
