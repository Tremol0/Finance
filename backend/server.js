import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.route.js";
import tableRoutes from "./routes/table.route.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/tables", tableRoutes);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + process.env.PORT);
});
