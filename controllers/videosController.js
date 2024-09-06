const youtubeService = require('../services/MediaService');

/* Get (N) last videos */
const getLatestFacebookVideos = async (req, res) => {
    try {
        
        const number = req.params.number || 1;
        const response = await youtubeService.getLatestFacebookVideos(number);
        if (response.success) {
            res.json(response.videos);
        } else {
            res.status(500).json({ message: `Error al obtener los videos: ${response.error}` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getLatestFacebookImages = async (req, res) => {
    try {
        
        const number = req.params.number || 1;
        const response = await youtubeService.getLatestFacebookImages(number);
        if (response.success) {
            res.json(response.videos);
        } else {
            res.status(500).json({ message: `Error al obtener los videos: ${response.error}` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = {
    getLatestFacebookVideos,
    getLatestFacebookImages
};
