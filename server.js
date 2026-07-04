const express = require("express");
const cors = require("cors");

const connectDB = require("./DB/connection");

const app = express();

const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/contacts", require("./routes/contacts"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});