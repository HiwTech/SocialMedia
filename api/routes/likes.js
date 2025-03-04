import express from "express";
import { getLikes, addLikes, deleteLikes } from "../controller/likes.js";

const router = express.Router();

// Define routes
router.get("/", getLikes);
router.post("/", addLikes);
router.delete("/", deleteLikes);

export default router;
