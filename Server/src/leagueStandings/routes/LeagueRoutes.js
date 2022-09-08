const express = require("express");
const { StandingsControler } = require('../controler/StandingsControler');
const { FixtureControler } = require('../controler/FixtureControler');

const router = express.Router();

router.get("/standings", (req, res) => {
    const league = req.query.league;

    StandingsControler(league, res)
});

router.get("/fixtures", (req, res) => {
    const league = req.query.league;

    FixtureControler(league, res);
});

module.exports = router;