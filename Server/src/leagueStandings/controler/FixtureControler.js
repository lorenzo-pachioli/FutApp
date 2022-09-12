
exports.FixtureControler = (req, res, next) => {
    const league = req.query.league;

    if (league.length < 3 ||
        league.length > 4
    ) return res.json({
        success: false,
        content: [],
        msj: 'Incorrect league number'
    });

    next();
}