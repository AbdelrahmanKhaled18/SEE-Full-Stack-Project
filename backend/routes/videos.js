const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { Video, Athlete, VideoAthlete } = require('../models');
const { Op } = require('sequelize');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Upload video
router.post('/upload', upload.single('video'), async (req, res) => {
    try {
        const { athleteIds, duration } = req.body;
        const video = await Video.create({
            filename: req.file.filename,
            originalname: req.file.originalname,
            uploadDate: new Date(),
            duration: duration || null,
            status: 'Processing'
        });
        if (athleteIds) {
            const ids = Array.isArray(athleteIds) ? athleteIds : [athleteIds];
            await Promise.all(ids.map(aid => VideoAthlete.create({ videoId: video.id, athleteId: aid })));
        }
        // Simulate processing (set status to Complete after 2s)
        setTimeout(async () => {
            await video.update({ status: 'Complete' });
        }, 2000);
        res.status(201).json(video);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// List videos with metadata
router.get('/', async (req, res) => {
    try {
        const videos = await Video.findAll({ include: { association: 'Athletes' } });
        res.json(videos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get video by id
router.get('/:id', async (req, res) => {
    try {
        const video = await Video.findByPk(req.params.id, { include: { association: 'Athletes' } });
        if (!video) return res.status(404).json({ error: 'Not found' });
        res.json(video);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Filter videos by sport and date range
router.get('/filter', async (req, res) => {
    try {
        const { sport, startDate, endDate } = req.query;
        const where = {};
        if (startDate || endDate) {
            where.uploadDate = {};
            if (startDate) where.uploadDate['$gte'] = new Date(startDate);
            if (endDate) where.uploadDate['$lte'] = new Date(endDate);
        }
        const include = [];
        if (sport) {
            include.push({
                association: 'Athletes',
                where: { sport: { [Op.iLike]: sport } },
                through: { attributes: [] }
            });
        } else {
            include.push({ association: 'Athletes' });
        }
        const videos = await Video.findAll({ where, include });
        res.json(videos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router; 