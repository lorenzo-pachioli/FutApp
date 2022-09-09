const axios = require('axios');
const CronJob = require('cron').CronJob;
const { responseHandler } = require('../helper/responseHandler');
const { responseMapper, faseAndRound } = require('../helper/responseMapper');
const { fixtureModeling, standingsModeling } = require('../helper/modelsUtils');
const Fixture = require('../models/FixtureModel');
const Standings = require('../models/StandingsModel');

const league = '128';

exports.FixtureCrone = new CronJob(
    '0 0 04 * * *',
    function () {
        console.log('Fixture updated');
        FixtureUpdater();
        StandingsService();
    },
    'America/Argentina/Buenos_Aires'
);

function FixtureUpdater() {

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
        .then(async ([seasonFixtureRes, currentRoundRes]) => {
            const currentRoundData = responseHandler(currentRoundRes, league, 'fixture');
            const seasonFixtureData = responseHandler(seasonFixtureRes, league, 'fixture');

            if (seasonFixtureData.success) {

                seasonFixtureData.content = responseMapper(seasonFixtureData.content);
                if (currentRoundData.success) {

                    const round = faseAndRound(currentRoundData.content[0]);
                    seasonFixtureData.content = seasonFixtureData.content.map(fase => fase.fase === round.faseNum ? ({ ...fase, current: round }) : (fase))
                    /* const fixtureData = fixtureModeling(league, seasonFixtureData.content) */
                    await Fixture.findOneAndReplace({ _id: league }, { fases: seasonFixtureData.content }, { returnDocument: 'after' }); //Le pega a la DB con current
                } else {
                    /* const fixtureData = fixtureModeling(league, seasonFixtureData.content) */
                    await Fixture.findOneAndReplace({ _id: league }, { fases: seasonFixtureData.content }, { returnDocument: 'after' }); //Le pega a la DB sin current
                };
            } else {
                console.log("Couldn't update fixture:", seasonFixtureData.msj);    // Fallo peticion 
            };
        })
        .catch(err => {
            console.log('error', err);
        })
}

async function StandingsService() {
    try {
        const year = new Date().getFullYear();
        const leagueStandings = await axios.get(process.env.API_FOOTBALL_ENDPOINT + `/standings?league=${league}&season=${parseInt(year, 10)}`, {
            headers: {
                "x-rapidapi-key": process.env.API_KEY,
                "x-rapidapi-host": "v3.football.api-sports.io"
            }
        })
        const leagueStandingsData = responseHandler(leagueStandings, league, 'standings');

        if (leagueStandingsData.success) {
            await Standings.findOneAndReplace({ _id: league }, { standings: leagueStandingsData.content[0] }, { returnDocument: 'after' });
            /* const standingsData = standingsModeling(league, leagueStandingsData.content);
            standingsData.save(); */
        } else {
            console.log("Couldn't update standings:", leagueStandingsData.msj);
        }

    } catch (err) {
        console.log(err);
    }
}
