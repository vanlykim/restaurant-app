const express = require("express");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv").config();
const path = require("path");
const {
  userRoute,
  restaurantRoute,
  collectionRoute,
  restaurantCollectionRoute,
} = require("./routes");
const { errorHandler } = require("./middlewares/errorMiddleware");
const { sequelize } = require("./models");
const port = process.env.PORT || 5000;
const app = express();

sequelize.sync().then(() => {
  console.log("Postgres connected!");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/users", userRoute);
app.use("/api/restaurants", restaurantRoute);
app.use("/api/collections", collectionRoute);
app.use("/api/restaurant-collections", restaurantCollectionRoute);

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
