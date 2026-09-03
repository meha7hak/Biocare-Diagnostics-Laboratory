require("dotenv").config({ path: './bcd.env' });
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db.js");
const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.json({ message: "Biocare Diagnostics Laboratory Backend is Running" });
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is Running at ${PORT}`);
});
