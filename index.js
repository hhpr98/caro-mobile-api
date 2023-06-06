const express = require("express");
const env = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

const connection = require("./db/connection");

const app = express();
env.config();

// const corsOptions = {
//   origin: "http://localhost:1234/"
// };
// app.use(cors(corsOptions));
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Get room info
app.get("/rooms/:id", (req, res) => {
  const id = req.params.id || "";
  if (!id)
    return res.status(404).json({
      message: "FAILED",
      data: "Missing id parametter"
    });

  connection.query("SELECT * FROM room WHERE id = ?", [id], (err, rows, fields) => {
    if (err)
      return res.status(500).json({ error: 'Database error' });

    if (rows.length === 0)
      return res.status(404).json({
        message: "FAILED",
        data: `NOT FOUND room id ${id}`
      });

    res.status(200).json(rows[0]);
  });
});

// TODO: create room
// app.post("/rooms")

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
