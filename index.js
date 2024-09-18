require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const PORT = process.env.PORT || 5500;
const videosRoute = require("./routes/videos");
const imagesRoutes = require("./routes/images");
const surveyRoutes = require("./routes/survey");
const registerRoutes = require("./routes/register");
const https = require('https');
const fs = require('fs');

/* SSL */
const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/thecognacmusic.com/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/thecognacmusic.com/fullchain.pem"),
};

/* Configurations */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  handler: (req, res) => {
    return res
      .status(429)
      .json({ type: "error", data: "Error en el Intervalo de Peticiones" });
  },
  headers: true,
});

app.use(
  cors({
    origin: process.env.HOST_FRONT.replace(/\/$/, ""),
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(limiter);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ limit: "10kb", extended: true }));
app.use(express.json());

/* Routes */
app.use("/videos", videosRoute);
app.use("/images", imagesRoutes);
app.use("/survey", surveyRoutes);
app.use("/register", registerRoutes);

https.createServer(options, app).listen(PORT, () => {
  console.log(`Servidor HTTP escuchando en el puerto ${process.env.HOST_FRONT}`);
});
