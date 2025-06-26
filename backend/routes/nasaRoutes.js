const express = require('express');
const axios = require('axios');
const router = express.Router();

// NASA API key
const NASA_API_KEY = process.env.NASA_API_KEY;

// Route to get Astronomy Picture of the Day (APOD)
router.get('/apod', async (req, res) => {
    try {
        const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching APOD:', error.message);
        res.status(500).json({ error: 'Failed to fetch data from NASA API' });
    }
});

// Mars Rover Photos Route with query parameters
router.get('/mars-photos', async (req, res) => {
    const { rover = 'curiosity', sol = 1000, camera } = req.query;

    try {
        const nasaApiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos`;

        const params = {
            sol,
            api_key: NASA_API_KEY,
        };

        if (camera) {
            params.camera = camera;
        }

        const response = await axios.get(nasaApiUrl, { params });
        res.json(response.data.photos);
    } catch (error) {
        console.error('Error fetching Mars Rover Photos:', error.message);
        res.status(500).json({ error: 'Failed to fetch Mars Rover Photos' });
    }
});

// EPIC Route to get the latest Earth images
router.get('/epic', async (req, res) => {
    try {
        const response = await axios.get(`https://api.nasa.gov/EPIC/api/natural/images?api_key=${NASA_API_KEY}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching EPIC data:', error.message);
        res.status(500).json({ error: 'Failed to fetch EPIC data' });
    }
});

module.exports = router;
