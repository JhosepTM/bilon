import express from "express";
//const express = require('express');
import 'dotenv/config'
//require('dotenv').config();
import bodyParser from "body-parser";
import { pool } from './app/config/db.js';
//const { pool } = require('./app/config/db');
import { routerUp } from "./app/routes/uploads.js";
import { routerApp } from "./app/routes/appRoutes.js";
import { routerScorm } from "./app/routes/scormRoutes.js";

import cors from "cors";

const port = process.env.PORT; 

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', routerApp)
app.use('/api', routerUp);
app.use('/api', routerScorm);
 
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});