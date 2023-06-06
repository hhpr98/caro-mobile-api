const express = require("express");
const env = require("dotenv");

const app = express();
env.config();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "OK",
    data: "Hello World!"
  });
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`App is running as PORT ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
