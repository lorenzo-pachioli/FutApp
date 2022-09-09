const Standings = require('../models/StandingsModel');

exports.StandingsService = async (league, res) => {

    Standings.findOne({ _id: league }, {}, (err, standings) => {
        if (err) return res.json({
            success: false,
            msj: `Error: ${err}`,
            content: []
        });

        res.json({
            success: true,
            msj: `League ${league} standings in 2022`,
            content: standings.standings
        });
    })
}