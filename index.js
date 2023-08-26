const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/products");
const userRoutes = require("./routes/user");

const app = express();
const port = 3002;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(cors());

app.use("/products", productRoutes);
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log("server is  running on port :", port);
});
