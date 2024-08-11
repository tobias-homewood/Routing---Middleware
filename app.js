import shoppingRouter from "./routes/shoppingRoutes.js";
import express from "express";

const app = express();
app.use(express.json());
app.use("/items", shoppingRouter);

app.route("/").get((req, res) => {
  res.send("Hello, World!");
});

export default app;