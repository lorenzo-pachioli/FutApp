exports.faseAndRound = (round) => {
    let indice = round.indexOf("-");
    const position = round.slice(indice + 2);
    const roundNum = parseInt(position, 10);
    const fase = round.slice(0, 1);
    const faseNum = parseInt(fase, 10);
    return {roundNum, faseNum};
};

exports.responseMapper = (array) => {
    let resultMaped = [
        {
            fase: 1,
            matches: [],
            current: false
        }, {
            fase: 2,
            matches: [],
            current: false
        }
    ]
    let arrayPosition = 0;
    let lastRound = 0;
    let lastFase = 0;

    for (let i = 0; i < array.length; i++) {
        const {faseNum, roundNum} = this.faseAndRound(array[i].league.round);

        if (lastFase !== (faseNum - 1)) {
            lastFase = (faseNum - 1)
            arrayPosition = 0;
            lastRound = roundNum;
            resultMaped[(faseNum - 1)].matches.push([array[i]])
        }

        if (resultMaped[0].matches.length === 0) {
            lastRound = roundNum;
            resultMaped[0].matches.push([array[i]])
        }
        if (roundNum === lastRound) {
            resultMaped[(faseNum - 1)].matches[arrayPosition].push(array[i])
        } else {
            lastRound = roundNum;
            arrayPosition++;
            resultMaped[(faseNum - 1)].matches.push([array[i]])
        }
    }

    return resultMaped;
}
