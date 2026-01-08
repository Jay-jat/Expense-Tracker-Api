const bcrypt = require("bcrypt");
const User = require("../models/User");

const registerUser = async (req, res) => {
  try {
    // Check all the fields
    const { name, email, password } = req.body;
    if ((!name, !email, !password)) {
      res.status(400).json({
        message: "All fields are required",
      });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        message: "User already exists",
      });
    }
    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    // Send response
    res.redirect("/");
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};
module.exports = {
  registerUser,
};
