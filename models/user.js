import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["admin", "student"],
      default: "student",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (normalPassword) {
  return await bcrypt.compare(normalPassword, this.password);
};

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      userName: this.userName,
      role: this.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION }
  );

  return token;
};

export const User = model("User", userSchema);
