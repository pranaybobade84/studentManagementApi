import { User } from "../models/user.js";

// Register User Controller
export const register = async (req, res) => {
  const { userName, email, password, role } = req.body;
  if (!userName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (email.length < 5 || !email.includes("@")) {
    return res.status(400).json({ message: "Invalid email format" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Email already in use. Please login instead." });
    }

    const user = new User({ userName, email, password, role });
    await user.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

// LOGIN USER
export const loginUser = async (req, res) => {
  const { userNameOrEmail, password } = req.body;
  if (!userNameOrEmail || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({
      $or: [{ email: userNameOrEmail }, { userName: userNameOrEmail }],
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = await user.generateAuthToken();
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        userName: user.userName,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error logging in user",
      error: error.message,
    });
  }
};

// LOGOUT USER
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({
      message: "Error logging out user",
      error: error.message,
    });
  }
};
