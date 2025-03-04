import express from 'express'
import {
  getComments,
  addComments,
  getCommentsCount,
} from "../controller/comments.js";

const router = express.Router()
router.get("/", getComments);
router.post("/", addComments);
router.get("/count", getCommentsCount)

export default router