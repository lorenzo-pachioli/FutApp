const Standings = require('../models/StandingsModel');

exports.StandingsService = (league, res, next) => {

    Standings.findOne({ _id: league }, {}, (err, standings) => {
        if (err) return next(err);

        res.json({
            success: true,
            msj: `League ${league} standings in 2022`,
            content: standings.standings
        });
    });
}