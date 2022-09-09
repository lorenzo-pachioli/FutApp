exports.faseAndRound = (round) => {
    let indice = round.indexOf("-");
    
    if (indice > 0) {
        const position = round.slice(indice + 2);
        const roundNum = parseInt(position, 10);
        const fase = round.slice(0, 1);
        let faseNum = parseInt(fase, 10);
       
        if (typeof faseNum !== Number) {
            faseNum = round.slice(0, indice - 1)
        }
        return { roundNum, faseNum }
    }
    const roundNum = 1
    const faseNum = round;
    return { roundNum, faseNum };
};

exports.responseMapper = (array) => {
    let resultMaped = []
    let arrayPosition = 0;
    let subArrayPosition = 0;
    let lastRound ;
    let lastFase ;

    for (let i = 0; i < array.length; i++) {
        const { faseNum, roundNum } = this.faseAndRound(array[i].league.round);
        /* console.log(array[i].league.round, faseNum, roundNum); */
        if (lastFase !== faseNum) {
            lastFase = faseNum 
            subArrayPosition = 0;
            arrayPosition = resultMaped.length === 0  ? (0):(arrayPosition + 1)
            lastRound = roundNum;
            resultMaped.push({
                fase: faseNum,
                matches: [],
                current: false
            })
            resultMaped[arrayPosition].matches.push([array[i]])
        }else if (roundNum === lastRound) {
            /* console.log(resultMaped[arrayPosition].matches); */
            resultMaped[arrayPosition].matches[subArrayPosition].push(array[i])
        } else {
            lastRound = roundNum;
            subArrayPosition++;
            resultMaped[arrayPosition].matches.push([array[i]])
        }
    }

    return resultMaped;
}
