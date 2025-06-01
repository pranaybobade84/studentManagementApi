import jwt from "jsonwebtoken";

import { User } from "../models/user.js";

export const verifyToken = async (req, res,next) => {
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
  console.log("Verifying token...",token);
  try {
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next()
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
