const { FixtureService } = require('../service/FixtureService');

exports.FixtureControler = (league, res) => {
    if (league.length < 3 ||
        league.length > 4
    ) return res.json({
        success: false,
        content: [],
        msj: 'Incorrect league number'
    });

    FixtureService(league, res);
}