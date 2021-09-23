const mongoose = require("mongoose");

const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require("./app");

// Connecting Database
mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => console.log("DB connection successfull"));

const port = process.env.port;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
