const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// User registration
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered', isSuccess: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role: "user" });

    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY);
    res.status(201).json({ message: 'User registered successfully', isSuccess: true, token });
  } catch (err) {
    console.error("Error registering user:", err); // Log error for debugging
    res.status(500).json({ error: 'Error registering user', isSuccess: false });
  }
};

// User login
exports.loginUser = async (req, res) => {
  try {
    
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required', isSuccess: false });
    }
    const user_data = await User.findOne({email:email});
    console.log(user_data);
    if (!user_data) {
      console.log('User not found');
      return res.status(401).json({ error: 'Invalid credentials', isSuccess: false });
    }
    
    

    const isMatch = await bcrypt.compare(password, user_data.password);
    if (isMatch==false) {
      console.log('Incorrect password');
      return res.status(401).json({ error: 'Invalid credentials', isSuccess: false });
    }

    const token = jwt.sign({ id: user_data._id }, process.env.JWT_SECRET_KEY, );
    res.status(200).json({ message: 'Login successful', isSuccess: true, token,User_Role:user_data.role });
  } catch (err) {
    console.error("Error logging in user:", err); // Log error for debugging
    res.status(500).json({ error: 'Error logging in user', isSuccess: false });
  }
};
