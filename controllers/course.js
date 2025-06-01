import { Course } from "../models/course.js";

export const createCourse = async (req, res) => {
  console.log("Creating course...", req.body);
  const { title, description, credits } = req.body;
  if ([title, description, credits].some((field) => !field)) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingCourse = await Course.findOne({ title });
    if (existingCourse) {
      return res.status(400).json({ message: "Course already exists" });
    }
    const newCourse = new Course({ title, description, credits });
    await newCourse.save();
    return res
      .status(201)
      .json({ message: "Course created successfully", course: newCourse });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating course", error: error.message });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const { title } = req.query;

    const filter = title ? { title: { $regex: title, $options: "i" } } : {};

    const courses = await Course.find(filter);
    return res.status(200).json({ courses });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching courses", error: error.message });
  }
};

export const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { title, description, credits } = req.body;

  if ([title, description, credits].some((field) => !field)) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const course = await Course.findByIdAndUpdate(
      id,
      { title, description, credits },
      { new: true }
    );
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res
      .status(200)
      .json({ message: "Course updated successfully", course });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating course", error: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting course", error: error.message });
  }
};

export const getCourseById = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res.status(200).json({ course });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching course", error: error.message });
  }
};
