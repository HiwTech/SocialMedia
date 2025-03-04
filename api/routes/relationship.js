import express from "express";
import {
  getRelationship,
  addRelationship,
  deleteRelationship,
} from "../controller/relationship.js";

const router = express.Router();

// Define routes
router.get("/", getRelationship);
router.post("/", addRelationship);
router.delete("/", deleteRelationship);

export default router;
