const Fixture = require('../models/FixtureModel');

exports.FixtureService = (league, res) => {

    Fixture.findOne({ _id: league }, {}, (err, fixture) => {
        if (err) return next(err);

        res.json({
            success: true,
            msj: `League ${league} fixture in 2022`,
            content: fixture.fases
        });
    });
}
