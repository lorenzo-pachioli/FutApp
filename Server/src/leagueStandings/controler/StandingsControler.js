const { StandingsService } = require('../service/StandingsService');

exports.StandingsControler = (league, res) => {
    if (league.length < 3 ||
        league.length > 4
    ) return res.json({
        success: false,
        content: [],
        msj: 'Incorrect league number'
    });

    StandingsService(league, res);
}