const express = require("express");
const app = express();

app.use(express.json());

const authRoutes = require("./routes/auth.routes");
const sweetsRoutes = require("./routes/sweets.routes");

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetsRoutes);

app.get("/", (req, res) => {
    res.json({message: "Sweet Shop Management API running"});
});

module.exports = app;