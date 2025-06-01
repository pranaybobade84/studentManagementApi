import { Router } from "express";
import {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseById,
} from "../controllers/course.js";

import { verifyToken } from "../middlewares/verifyToken.js";
const courseRouter = Router();
courseRouter.get("/", verifyToken, getAllCourses);
courseRouter.post("/", verifyToken, createCourse);
courseRouter.put("/:id", verifyToken, updateCourse);
courseRouter.get("/:id", verifyToken, getCourseById);
courseRouter.delete("/:id", verifyToken, deleteCourse);

export default courseRouter;
