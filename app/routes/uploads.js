import express from "express";
import { multerUpload, uploadFile, publicUp, fileID, allFiles, filePath, deleteFile } from "../controllers/upload.js";

export const routerUp = express.Router();

routerUp.post("/upload", multerUpload.single("file"), uploadFile);
routerUp.use("/public", publicUp);
routerUp.get("/file", fileID);
routerUp.get("/filesNames", allFiles);
routerUp.get("/filePath", filePath);
routerUp.delete("/deleteFile", deleteFile);

