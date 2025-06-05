const express = require('express');
const router = express.Router();
const { PerformanceMetric, Athlete, Video } = require('../models');

// Add performance metric
router.post('/', async (req, res) => {
    try {
        const metric = await PerformanceMetric.create(req.body);
        res.status(201).json(metric);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// List metrics (optionally filter by athleteId, videoId)
router.get('/', async (req, res) => {
    try {
        const { athleteId, videoId } = req.query;
        const where = {};
        if (athleteId) where.athleteId = athleteId;
        if (videoId) where.videoId = videoId;
        const metrics = await PerformanceMetric.findAll({
            where,
            include: [Athlete, Video]
        });
        res.json(metrics);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router; 