const express = require("express");
const { StandingsControler } = require('../controler/StandingsControler');
const { FixtureControler } = require('../controler/FixtureControler');
const { StandingsService } = require('../service/StandingsService');
const { FixtureService } = require('../service/FixtureService');

const router = express.Router();

router.get("/standings", StandingsControler, (req, res, next) => {
    const league = req.query.league;
    StandingsService(league, res, next);
});

router.get("/fixtures", FixtureControler, (req, res, next) => {
    const league = req.query.league;
    FixtureService(league, res, next);
});

router.use((err, req, res, next) => {
    console.error('error:', err)
    res.status(500).json({
        success: false,
        content: [],
        msj: 'Something broke!'
    });
});

router.use((req, res) => {
    const path = req.originalUrl;
    res.status(404).send(`Sorry can't find: ${path}`);
});

module.exports = router;
