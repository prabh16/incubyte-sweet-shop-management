const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

const authRoutes = require("./routes/auth.routes");
const sweetsRoutes = require("./routes/sweets.routes");

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetsRoutes);

app.get("/", (req, res) => {
    res.json({message: "Sweet Shop Management API running"});
});

module.exports = app;