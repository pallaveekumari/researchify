

const express = require("express");
const { connection } = require("./config/db");
const cors = require("cors");
const AllRoutes = require("./Routes/AllRoutes");

require("dotenv").config();
const port = process.env.PORT || 8500;
const app = express();
app.use(cors(), express.json());

app.use("/", AllRoutes);

app.listen(port, async () => {
  try {
    await connection;
    console.log(`listening on port ${port}`);
    console.log("Connected to DB Success");
  } catch (err) {
    console.log("Failed to connect to DB");
  }
});
