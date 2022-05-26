const express = require("express");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv").config();
const {
  userRoute,
  restaurantRoute,
  collectionRoute,
  restaurantCollectionRoute,
} = require("./routes");
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/users", userRoute);
app.use("/api/restaurants", restaurantRoute);
app.use("/api/collections", collectionRoute);
app.use("/api/restaurant-collections", restaurantCollectionRoute);

app.listen(port, () => console.log(`Server started on port ${port}`));
