const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const connectDB = require("./DB/connection");
const swaggerDocument = require("./swagger.json");

const app = express();

const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/contacts", require("./routes/contacts"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});