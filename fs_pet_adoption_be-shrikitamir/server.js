const express = require("express");
const app = express();
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
  const morgan = require("morgan");
  app.use(morgan("dev"));
}
const cors = require("cors");
const logger = require("./config/winston");
const { postgrator } = require("./config/db");
const { authorize } = require("./middlewares/authorization");
const PORT = process.env.PORT || 5000;
const authRoute = require("./src/routes/auth.route");
const petRoute = require("./src/routes/pet.route");
const userRoute = require("./src/routes/user.route");
const likeRoute = require("./src/routes/like.route");
const uploadRoute = require("./src/routes/upload.route");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/auth", authRoute);
app.use("/pet", petRoute);
app.use("/user", authorize, userRoute);
app.use("/like", authorize, likeRoute);
app.use("/upload", authorize, uploadRoute);
app.get("*", (req, res) => res.status(404).send("Page doesn't exist"));

postgrator
  .migrate()
  .then((result) => {
    console.log("Migrated db successfully.");
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  })
  .catch((error) => {
    logger.error(error.stack);
    process.exit(1);
  });
