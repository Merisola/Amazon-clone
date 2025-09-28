import { setGlobalOptions } from "firebase-functions";
import { onRequest } from "firebase-functions/https";
import express from "express";
import Stripe from "stripe";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); 

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());


// eslint-disable-next-line no-undef
const stripe = new Stripe(process.env.STRIPE_KEY, { apiVersion: "2022-11-15" });

app.get("/", (req, res) => {
  res.status(200).json({ message: "Success!" });
});

app.post("/payment/create", async (req, res) => {
  const total = parseInt(req.query.total, 10);

  if (total > 0) {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total * 100,
        currency: "USD",
    })

    res.status(201).json(
        {
            ClientSecret: paymentIntent.client_secret,
        }
    )
  }else{
    res.status(403).json(
        {
            message:"Total must be greater than 0"
        }
    );

  }
});

export const api = onRequest(app);
setGlobalOptions({ maxInstances: 10 });
