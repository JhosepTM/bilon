const db = require('./app/config/db'); 
// const express = require('express');
// require('dotenv').config();
// const app = express();
// const { pool } = require('./app/config/db');
const port = process.env.PORT;

// app.get('/api/xd', async (req, res) => {
//     try{
//         const {rows} = await pool.query('SELECT * FROM User'); 
//         res.json(rows);
//     }catch(e){
//         console.log("Error al obtener usuarios", e);
//         res.status(500).json({error: "Error al obtener usuarios"});
//     }
// });

const express = require('express');
const app = express();
const routes = require('./app/routes/appRoutes');

app.use(express.json());
// Asociar las rutas configuradas en routes.js
app.use('/api', routes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});