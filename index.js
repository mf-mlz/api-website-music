require('dotenv').config();

const express = require('express');
const app = express();

// Utilizar la variable de entorno PORT
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('¡Hola Mundo!');
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
