const Fixture = require('../models/FixtureModel');
const Standings = require('../models/StandingsModel');

exports.fixtureModeling = (league, fases) => {
    if (!fases || !league) return false;
    const newFixture = Fixture({
        _id: league,
        fases: fases
    });
    return newFixture;
}

exports.standingsModeling = (league, standings) => {
    if (!standings || !league) return false;
    const newStandings = Standings({
        _id: league,
        standings: standings
    });
    return newStandings;
}