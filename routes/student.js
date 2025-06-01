import { Router } from "express";

const studentRouter = Router();
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentById,
} from "../controllers/students.js";
import { verifyToken } from "../middlewares/verifyToken.js";

studentRouter.get("/", verifyToken, getAllStudents);
studentRouter.get("/:id", verifyToken, getStudentById);
studentRouter.post("/", verifyToken, createStudent);
studentRouter.put("/:id", verifyToken, updateStudent);
studentRouter.delete("/:id", verifyToken, deleteStudent);

export default studentRouter;
