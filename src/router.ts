import { Router } from "express";
import PostController from "./Controllers/PostController";

const router = Router();

router.get("/posts", PostController.getAll)
router.post("/posts", PostController.create)

export default router;