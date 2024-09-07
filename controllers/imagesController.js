const youtubeService = require('../services/MediaService');

/* Get (N) last Images */

const getLatestInstagramImages = async (req, res) => {
    try {
        const number = req.params.number || 1;
        
        const response = await youtubeService.getLatestInstagramImages(number);
        if (response.success) {
            res.json(response.images);
        } else {
            res.status(500).json({ message: `Error al obtener los videos: ${response.error}` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = {
    getLatestInstagramImages
};
