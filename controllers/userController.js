const User = require('../models/User');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createUser = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, enrolledCourses } = req.body;

  try {
    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with hashed password and enrolled courses
    const newUser = new User({
      name,
      email,
      password: hashedPassword, // Store hashed password in the database
      enrolledCourses // Include enrolled courses
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.updateUser = async (req, res) => {
  try {
    let { name, email, password, enrolledCourses } = req.body;

    // Check if the password is provided in the request body
    if (password) {
      // Hash the provided password
      password = await bcrypt.hash(password, 10);
    }

    // Find the user by ID and update the information
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, password, enrolledCourses },
      { new: true }
    );

    // Check if the user exists
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
