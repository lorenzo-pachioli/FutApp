const Fixture = require('../models/FixtureModel');

exports.FixtureService = (league, res) => {
    try {
        Fixture.findOne({ _id: league }, {}, (err, fixture) => {
            if (err) return res.json({
                success: false,
                msj: `Error: ${err}`,
                content: []
            });

            res.json({
                success: true,
                msj: `League ${league} fixture in 2022`,
                content: fixture.fases
            });
        })
    } catch (err) {
        return res.json({
            success: false,
            msj: `Error: ${err}`,
            content: []
        });
    }
}
