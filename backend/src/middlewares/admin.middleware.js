module.exports = (req, res, next) => {
  if (req.headers["x-admin"] === "true") {
    return next();
  }
  return res.status(403).json({ message: "Admin access required" });
};