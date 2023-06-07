import express from "express";
//const express = require('express');
import 'dotenv/config'
//require('dotenv').config();
import bodyParser from "body-parser";
import { pool } from './app/config/db.js';
//const { pool } = require('./app/config/db');
import { routerUp } from "./app/routes/uploads.js";
const app = express();
const port = process.env.PORT; 

app.get('/api/xd', async (req, res) => {
    try{
        const {rows} = await pool.query('SELECT * FROM User'); 
        res.json(rows);
    }catch(e){
        console.log("Error al obtener usuarios", e);
        res.status(500).json({error: "Error al obtener usuarios"});
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', routerUp);
 
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});

