import { Schema, model } from "mongoose";

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 500,
    },
    credits: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
  },
  { timeStamps: true }
);

export const Course = model("Course", courseSchema);