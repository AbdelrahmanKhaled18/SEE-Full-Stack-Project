const express = require('express');
const router = express.Router();
const { Athlete } = require('../models');

// Create athlete
router.post('/', async (req, res) => {
    try {
        const athlete = await Athlete.create(req.body);
        res.status(201).json(athlete);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all athletes
router.get('/', async (req, res) => {
    try {
        const athletes = await Athlete.findAll({
            include: [
                {
                    association: 'Videos',
                    through: { attributes: [] }
                },
                {
                    association: 'PerformanceMetrics'
                }
            ]
        });
        res.json(athletes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get athlete by id
router.get('/:id', async (req, res) => {
    try {
        const athlete = await Athlete.findByPk(req.params.id);
        if (!athlete) return res.status(404).json({ error: 'Not found' });
        res.json(athlete);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update athlete
router.put('/:id', async (req, res) => {
    try {
        const athlete = await Athlete.findByPk(req.params.id);
        if (!athlete) return res.status(404).json({ error: 'Not found' });
        await athlete.update(req.body);
        res.json(athlete);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete athlete
router.delete('/:id', async (req, res) => {
    try {
        const athlete = await Athlete.findByPk(req.params.id);
        if (!athlete) return res.status(404).json({ error: 'Not found' });
        await athlete.destroy();
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Athlete dashboard view
router.get('/:id/dashboard', async (req, res) => {
    try {
        const athlete = await Athlete.findByPk(req.params.id, {
            include: [
                {
                    association: 'Videos',
                    through: { attributes: [] }
                },
                {
                    association: 'PerformanceMetrics'
                }
            ]
        });
        if (!athlete) return res.status(404).json({ error: 'Not found' });
        res.json(athlete);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router; 