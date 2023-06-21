import express from "express";
import { genScorm } from "../controllers/scorm.js";

export const routerScorm = express.Router();

routerScorm.post("/genScorm", genScorm);