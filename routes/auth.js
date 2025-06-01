import { Router } from "express";
import { register, loginUser, logout } from "../controllers/auth.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const authRouter = Router();
authRouter.post("/register", register);
authRouter.post("/login", loginUser);

authRouter.get("/logout", verifyToken, logout);

export default authRouter;
