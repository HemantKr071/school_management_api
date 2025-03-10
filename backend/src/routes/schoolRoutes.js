import express from "express";
import { addSchool, listSchools } from "../controllers/schoolController.js";

const router = express.Router();

// Add School
router.post("/add_school", addSchool);

// List Schools
router.get("/list_schools", listSchools);

export default router;
