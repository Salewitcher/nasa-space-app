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

// Mars Rover Photos Route with pagination and enforced 20-photo limit
router.get('/mars-photos', async (req, res) => {
    const { rover = 'curiosity', sol = 1000, camera, page = 1 } = req.query;
    const perPage = 20;
    const pageNum = Number(page);

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

        const allPhotos = response.data.photos || [];

        // Pagination slice
        const startIndex = (pageNum - 1) * perPage;
        const slicedPhotos = allPhotos.slice(startIndex, startIndex + perPage);

        res.json({
            photos: slicedPhotos,
            page: pageNum,
            total: allPhotos.length,
        });
    } catch (error) {
        console.error('Error fetching Mars Rover Photos:', error.message);
        res.status(500).json({ error: 'Failed to fetch Mars Rover Photos' });
    }
});

// EPIC Route with pagination and 20-item limit
router.get('/epic', async (req, res) => {
    const page = Number(req.query.page) || 1;
    const perPage = 20;

    try {
        const response = await axios.get(`https://api.nasa.gov/EPIC/api/natural/images?api_key=${NASA_API_KEY}`);

        const allPhotos = response.data || [];
        const total = allPhotos.length;

        // Calculate start/end for pagination
        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;

        const paginatedPhotos = allPhotos.slice(startIndex, endIndex);

        res.json({
            photos: paginatedPhotos,
            page,
            total,
        });
    } catch (error) {
        console.error('Error fetching EPIC data:', error.message);
        res.status(500).json({ error: 'Failed to fetch EPIC data' });
    }
});

// NEO Route with pagination and 20-item limit
router.get('/neo', async (req, res) => {
    const page = Number(req.query.page) || 1;
    const perPage = 20;
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    try {
        const response = await axios.get(`https://api.nasa.gov/neo/rest/v1/feed`, {
            params: {
                start_date: today,
                end_date: today,
                api_key: NASA_API_KEY,
            },
        });

        const neoData = response.data.near_earth_objects?.[today] || [];
        const total = neoData.length;

        // Paginate the NEO data
        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;
        const paginatedNEOs = neoData.slice(startIndex, endIndex);

        res.json({
            neos: paginatedNEOs,
            page,
            total,
        });
    } catch (error) {
        console.error('Error fetching NEO data:', error.message);
        res.status(500).json({ error: 'Failed to fetch NEO data' });
    }
});

module.exports = router;
