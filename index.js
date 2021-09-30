const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 8081;
const stripe = require("stripe")(
  "sk_test_51Jf2UySITiqJpF1eiPYZ5zIEx0P5vGnUHNuaKkAQf7lFzr44fH5DB3XEaGGsuZzTABAZZH8RyXQ4Ju1w2pZ4xrkL00tty2dNlZ"
);

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hey how r u");
});

app.post("/payment/create", async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.total * 100,
    currency: "inr",
  });
  res.send({ clientsecret: paymentIntent.client_secret });
});

app.listen(port, () => {
  console.log("App listening.....");
});
