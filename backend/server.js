import express from "express";
import products from "./Data/products.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
const port = process.env.PORT || 5000;
dotenv.config();
connectDB(); // connect to MongoDB
const app = express();

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //get req,body data
app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`server is running on ${port}`));
