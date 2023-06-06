const express = require('express');

const app = express();
const { dbConnect } = require('./app/config/db');
const port = 3000;

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});