import Auth from '../models/authModel.js';
import jwt from 'jsonwebtoken';

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Utility to validate strong password
const isStrongPassword = (password) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
};

// ✅ Register Admin or User
export const registerAdmin = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email.' });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({
        message:
          'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.',
      });
    }

    const newUser = new Auth({
      username,
      email,
      password,
      role: role || 'user',
    });

    await newUser.save();

    res.status(201).json({ message: 'Registration successful!' });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ message: 'Server error. Could not register user.' });
  }
};

// ✅ Login Admin or User
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id, user.role);

    res.status(200).json({
      token,
      admin: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// controllers/authController.js or .ts
export const logoutAdmin = async (req, res) => {
    try {
    const user = await Auth.findById(req.user.id); // req.user from protect middleware
    if (user) {
      user.active = false;
      await user.save();
    }

    res.clearCookie('adminToken');
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: 'Logout failed', error });
  }
};


// ✅ Get Admin by ID
export const getAdminById = async (req, res) => {
  try {
    const admin = await Auth.findById(req.params.id);
    if (!admin || admin.role !== 'admin') {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json({ username: admin.username });
  } catch (err) {
    console.error('Get Admin Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Get User by ID
export const getUserById = async (req, res) => {
  try {
    const user = await Auth.findById(req.params.id);
    if (!user || user.role !== 'user') {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ username: user.username });
  } catch (err) {
    console.error('Get User Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Get All Users

export const getAllUsers = async (req, res) => {
  try {
    const users = await Auth.find().select("-password"); // password field हटाइएको
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};


// DELETE user by email
export const deleteUserByEmail = async (req, res) => {
  try {
    const user = await Auth.findOneAndDelete({ email: req.params.email });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// UPDATE user by email
export const updateUserByEmail = async (req, res) => {
  try {
    const user = await Auth.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Login सफल हुँदा active true set गर्ने
    user.active = true;
    await user.save();

    // Token generate
    const token = generateToken(user);

    res.json({ token, user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const logout = async (req, res) => {
  try {
    const userId = req.user.id;
    await User.findByIdAndUpdate(userId, { active: false });
    res.status(200).json({ message: 'Logout सफल भयो, active false गरियो' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


