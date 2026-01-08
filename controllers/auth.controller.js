const bcrypt = require("bcrypt");
const User = require("../models/User");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send("All fields are required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.redirect("/");
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).send("Server Error");
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("All fields are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid email or password");
    }

    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    res.redirect("/");
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  registerUser,
  loginUser,
};
