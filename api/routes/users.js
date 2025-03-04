import express from 'express';

const router = express.Router();
import { getUser, updateUser, getAllUser } from "../controller/users.js";

router.get("/find/:userid", getUser);
router.put("/", updateUser);
router.get("/find/", getAllUser);

export default router