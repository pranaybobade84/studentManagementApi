import { Student } from "../models/student.js";
import { Course } from "../models/course.js";

export const createStudent = async (req, res) => {
  const { name, age, department, email } = req.body;

  if ([name, age, department, email].some((field) => !field)) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists" });
    }
    const newStudent = new Student({ name, age, department, email });
    await newStudent.save();
    return res
      .status(201)
      .json({ message: "Student created successfully", student: newStudent });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating student", error: error.message });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const { department } = req.query;

    const filter = department ? { department } : {};

    const total = await Student.countDocuments(filter);

    const students = await Student.find(filter)
      .populate("enrolledCourses")
      .skip(skip)
      .limit(limit)

    return res.status(200).json({
      page,
      totalPages: Math.ceil(total / limit),
      totalStudents: total,
      students,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching students",
      error: error.message,
    });
  }
};

export const getStudentById = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findById(id).populate("enrolledCourses");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.status(200).json({ student });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching student", error: error.message });
  }
};

export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, age, department, email } = req.body;

  if ([name, age, department, email].some((field) => !field)) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { name, age, department, email },
      { new: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.status(200).json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating student", error: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting student", error: error.message });
  }
};


