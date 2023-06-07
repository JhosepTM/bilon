import express from "express";
//const express = require('express');
import pg from "pg";
const { Pool } = pg;
//const { Pool } = require('pg');
import 'dotenv/config'
//require('dotenv').config();

const app = express();
const port = 3000;

// Configuración de la conexión a la base de datos
export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

//module.exports = {pool};