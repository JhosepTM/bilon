const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Configuración de la conexión a la base de datos
const pool = new Pool({
  user: 'hfreietr',
  host: 'postgres://hfreietr:KBVb38W90_bYnCheBx9nIXP-oor2C6MX@snuffleupagus.db.elephantsql.com/hfreietr',
  database: 'hfreietr',
  password: 'KBVb38W90_bYnCheBx9nIXP-oor2C6MX',
  port: 5432,
});

// Ruta de ejemplo
app.get('/api/usuarios', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM usuarios');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener los usuarios', error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});