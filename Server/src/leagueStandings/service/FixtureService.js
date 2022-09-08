const axios = require('axios');
const { responseHandler } = require('../helper/responseHandler');
const { responseMapper, faseAndRound } = require('../helper/responseMapper');

exports.FixtureService = async (league, res) => {

    const seasonFixture = axios.get(process.env.API_FOOTBALL_ENDPOINT + `/fixtures?league=${league}&season=2022`, {
        headers: {
            "x-rapidapi-key": process.env.API_KEY,
            "x-rapidapi-host": "v3.football.api-sports.io"
        }
    })

    const currentRound = axios.get(process.env.API_FOOTBALL_ENDPOINT + `/fixtures/rounds?league=${league}&season=2022&current=true`, {
        headers: {
            "x-rapidapi-key": process.env.API_KEY,
            "x-rapidapi-host": "v3.football.api-sports.io"
        }
    })

    Promise.all([seasonFixture, currentRound])
        .then(([seasonFixtureRes, currentRoundRes]) => {
            const currentRoundData = responseHandler(currentRoundRes, league, 'fixture');
            const seasonFixtureData = responseHandler(seasonFixtureRes, league, 'fixture');
           
            if (seasonFixtureData.success) {
                
                seasonFixtureData.content = responseMapper(seasonFixtureData.content);
                if (currentRoundData.success) {
                    const round = faseAndRound(currentRoundData.content[0]);
                    seasonFixtureData.content = seasonFixtureData.content.map(fase => fase.fase === round.faseNum ? ({ ...fase, current: round }) : (fase))
                    
                    res.json(seasonFixtureData);
                }else {
                    res.json(seasonFixtureData);
                };

            } else {
                res.json(seasonFixtureData);
            };
        })
        .catch(err => {
            console.log('error', err);
            return res.json({
                success: false,
                msj: `Error: ${err}`,
                content: []
            });
        })

}
