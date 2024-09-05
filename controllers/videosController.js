const youtubeService = require('../services/youtubeService');

/* Get 5 last videos */
const getLatestFacebookVideos = async (req, res) => {
    try {
        const response = await youtubeService.getLatestFacebookVideos();
        if (response.success) {
            res.json(response.videos);
        } else {
            res.status(500).json({ message: `Error al obtener los videos: ${response.error}` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getVideoById = (req, res) => {
    const videoId = req.params.id;
    res.send(`Detalles del video con ID: ${videoId}`);
};

const createVideo = (req, res) => {
    const newVideo = req.body;
    res.send(`Nuevo video creado: ${JSON.stringify(newVideo)}`);
};

module.exports = {
    getLatestFacebookVideos,
    getVideoById,
    createVideo
};
