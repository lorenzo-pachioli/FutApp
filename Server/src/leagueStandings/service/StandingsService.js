const axios = require('axios');
const { responseHandler } = require('../helper/responseHandler');

exports.StandingsService = async (league, res) => {
    try {
        const year = new Date().getFullYear();
        const leagueStandings = await axios.get(process.env.API_FOOTBALL_ENDPOINT + `/standings?league=${league}&season=${parseInt(year, 10)}`, {
            headers: {
                "x-rapidapi-key": process.env.API_KEY,
                "x-rapidapi-host": "v3.football.api-sports.io"
            }
        })
        const leagueStandingsData = responseHandler(leagueStandings, league, 'standings');
        
        res.json(leagueStandingsData);
    } catch (err) {
        console.log(err);
        return res.json({
            success: false,
            msj: err,
            content: []
        });
    }
}