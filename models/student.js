import { Schema, model } from "mongoose";
const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    age: {
      type: Number,
      required: true,
      min: 1,
      max: 120,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    enrolledCourses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
        default: null,
      },
    ],
    addmissionDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Student = model("Student", studentSchema);
