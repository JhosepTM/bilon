const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Configuración de la conexión a la base de datos
const pool = new Pool({
  user: 'hfreietr',
  //host: 'postgres://hfreietr:KBVb38W90_bYnCheBx9nIXP-oor2C6MX@snuffleupagus.db.elephantsql.com/hfreietr',
  host: 'snuffleupagus.db.elephantsql.com',
  database: 'hfreietr',
  password: 'KBVb38W90_bYnCheBx9nIXP-oor2C6MX',
  port: 5432,
});

module.exports = pool;