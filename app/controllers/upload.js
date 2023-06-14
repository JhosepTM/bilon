import express from "express";
import multer from "multer";
import path, { dirname, extname, join } from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { pool } from "../config/db.js";
import { callbackify } from "util";

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));
const MIMETYPES = ["image/png", "image/jpg", "image/jpeg", "image/gif", "video/mp4", "video/mpeg", "video/webm", "video/ogg", "application/pdf", "audio/mpeg", "audio/mp3", "aduio/ogg", "audio/wav"];

export const multerUpload = multer({
    storage: multer.diskStorage({
        destination: join(CURRENT_DIR, "../uploads"),
        filename: (req, file, cb) => {
            const fileExtention = extname(file.originalname);
            const fileName = file.originalname.split(fileExtention)[0];
            const idU = 777;
            cb(null, `${idU}-${Date.now()}-${fileName}${fileExtention}`);	
        },
    }),
    fileFilter: (req, file, cb) => {
        if(MIMETYPES.includes(file.mimetype)) {
            cb(null, true);
        }else{
            cb(new Error("File type not supported"));
        }
    },
    limits: {
        fileSize: 10000000
    },
});

export const uploadFile = async (req, res, next) => {
    console.log("FILE: ",req.file);
    const client = await pool.connect();
    try{
        await client.query("BEGIN");

        const queryMD = 'INSERT INTO metadata (formatarch, fechacreacion, fechamodificacion) VALUES ($1, $2, $3) RETURNING id';
        const valuesMD = [req.file.mimetype, new Date(), new Date()];

        const result1 = await client.query(queryMD, valuesMD);
        
        const queryAs = 'INSERT INTO assets (path, description, metadata_id) VALUES ($1, $2, $3) RETURNING id';
        const description = req.body.description || "";
        const idMD = result1.rows[0].id;
        const valuesAs = [req.file.filename, description, idMD];
        
        const result2 = await client.query(queryAs, valuesAs);
        const idAs = result2.rows[0].id;
        
        await client.query("COMMIT");

        res.status(200).send({message: `File uploaded successfully, idMetaData: ${idMD}, idAsset: ${idAs}}`, id: idAs});
    }catch(e){
        console.log("Error al insertar registro", e);
        await client.query("ROLLBACK");
        res.status(500).json({error: "Error al insertar registro"});
    }finally{
        client.release();
    }
    
}

export const fileID = async (req, res, next) => {
    const client = await pool.connect();
    try{
        const query = 'SELECT * FROM assets WHERE id = $1';
        const values = [req.params.id];
        const result = await client.query(query, values);
        if(result.rows.length > 0){
            const filePath = path.join(CURRENT_DIR, "../uploads", result.rows[0].path);
            res.download(filePath, result.rows[0].path, (err) => {
                if(err){
                    console.log("Error al descargar archivo", err);
                    res.status(500).json({error: "Error al descargar archivo"});
                }
            });
        }else{
            res.status(404).json({error: "File not found"});
        }
    }catch(e){
        console.log("Error al obtener registro", e);
        res.status(500).json({error: "Error al obtener registro"});
    }
}

export const publicUp = express.static(join(CURRENT_DIR, "../uploads"));

const filesNames = (id, callback) =>{
    fs.readdir(join(CURRENT_DIR, "../uploads"), (err, files) => {
        if(err){
            console.log("Error al obtener archivos", err);
            return [];
        }
        
        const names = files.filter((file) => {
            const nameC = path.basename(file);
            const idC = nameC.split("-")[0];
            return idC == id;
        });

        callback(null, names);
    });
}

export const allFiles = async (req, res, next) => {
    const id = req.body.id ||  777;
    filesNames(id, (err, files) => {
        if (err) {
            console.log("Error al obtener archivos", err);
            res.status(500).json({ error: "Error al obtener archivos" });
        }
        
        console.log("FILES: ", files);
        return res.status(200).json({ files });     
    });
}

export const filePath = async (req, res, next) => {
    const path = req.body.path;
    const filePath = join(CURRENT_DIR, "../uploads", path);
    res.download(filePath, path, (err) => {
        if(err){
            if(err.code === "ENOENT"){
                res.status(404).json({error: "File not found"});
            }else{
                console.log("Error al descargar archivo", err);
                res.status(500).json({error: "Error al descargar archivo"});
            }
        }
    });
}

export const deleteFile = async (req, res, next) => {
    const id = req.params.id;
    const client = await pool.connect();
    try {
        await client.query("BEGIN");

        const { rows } = await client.query("SELECT * FROM assets WHERE id = $1", [id]);
        const path = rows[0].path;
        const idMD = rows[0].metadata_id;
        await client.query("DELETE FROM assets WHERE id = $1", [id]);
        await client.query("DELETE FROM metadata WHERE id = $1", [idMD]);

        await client.query("COMMIT");

        fs.unlink(join(CURRENT_DIR, "../uploads", path), (err) => {
            if(err){
                console.log("Error al eliminar archivo", err);
                client.query("ROLLBACK");
                res.status(500).json({error: "Error al eliminar archivo"});
            }
        });

        res.status(200).json({message: "File deleted successfully"});
    }catch(e){
        await client.query("ROLLBACK");
        console.log("Error al eliminar registro", e);
        res.status(500).json({error: "Error al eliminar registro"});
    }finally{
        client.release();
    }
}


/*
const expressApp = express();

expressApp.post("/upload", multerUpload.single("file"), (req, res) => {
    console.log(req.file);
    res.send(200);
});

expressApp.use('/public',express.static(join(CURRENT_DIR, "../uploads")));

expressApp.listen(3000, () => {
    console.log(`Server started at port ${3000}`);
});
*/