import express from "express";
//const express = require('express');
import 'dotenv/config'
//require('dotenv').config();
import bodyParser from "body-parser";
import { pool } from './app/config/db.js';
//const { pool } = require('./app/config/db');
import { routerUp } from "./app/routes/uploads.js";

const port = process.env.PORT; 

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', routerUp);
 
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});