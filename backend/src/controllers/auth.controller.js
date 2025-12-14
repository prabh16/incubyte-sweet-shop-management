const fs = require("fs");
const path = require("path");
const { generateToken } = require("../utils/jwt");

const USERS_FILE = path.join(__dirname, "../users.json");
const registeringEmails = new Set();

const readUsers = () => {
  if (!fs.existsSync(USERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
};

const writeUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};



/* -------- REGISTER -------- */
const registerUser = (req, res) => {

  const { email, password } = req.body;

  if (!email)
    return res.status(400).json({ message: "Email is required" });

  if (!password)
    return res.status(400).json({ message: "Password is required" });

  if (password.length < 6)
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });

  //  LOCK CHECK (THIS IS THE KEY)
  if (registeringEmails.has(email)) {
    return res.status(409).json({
      message: "Account already exists",
    });
  }

  registeringEmails.add(email);

  const users = readUsers();

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    registeringEmails.delete(email);
    return res.status(409).json({
      message: "Account already exists",
    });
  }

  users.push({ email, password });
  writeUsers(users);

  registeringEmails.delete(email);

  return res.status(201).json({
    message: "Account created successfully",
  });
};


/* -------- LOGIN -------- */
const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Email and password required" });

  const users = readUsers();

  const user = users.find((u) => u.email === email);
  if (!user)
    return res.status(404).json({
      message: "Account does not exist. Please register first",
    });

  if (user.password !== password)
    return res.status(401).json({
      message: "Incorrect password",
    });

  const token = generateToken({ email });
  return res.status(200).json({ token });
};

module.exports = { registerUser, loginUser };
