require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5500;
const videosRoute = require('./routes/videos');

app.use(express.json());
app.use('/videos', videosRoute);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
