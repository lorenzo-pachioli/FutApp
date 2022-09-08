import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../Context/AppContext';
import Partido from './Partido/Partido';
import './Resultados.css';

export default function Resultados() {

    const { resultsPD } = useContext(AppContext);
    const [results, setResults] = useState([]);
    const [selector, setSelector] = useState({});

    useEffect(() => {

        if (resultsPD.length > 0) {
            const fase = resultsPD.find(fas => fas.current !== false)
            if (fase) {
                const round = fase.matches.find(rd => {
                    let indice = rd[0].league.round.indexOf("-");
                    // eslint-disable-next-line eqeqeq
                    return rd[0].league.round.slice(indice + 2) == fase.current.roundNum
                })

                setSelector(selec => {
                    if (!selec.faseNum) {
                        return {
                            faseNum: resultsPD.indexOf(fase),
                            roundNum: fase.matches.indexOf(round)
                        }
                    }
                    return selec;
                });
            } else {
                console.log('no current');
                setSelector({
                    faseNum: resultsPD.length - 1,
                    roundNum: 0
                })
            }


        }
    }, [resultsPD]);

    useEffect(() => {

        if (selector.faseNum !== undefined) {
            if (resultsPD[selector.faseNum]) {
                console.log('selector');
                setResults(resultsPD[selector.faseNum].matches[selector.roundNum])
            }
        }
    }, [resultsPD, selector]);

    const handleChangeRoundDown = () => {

        if (!resultsPD[selector.faseNum].matches[(selector.roundNum - 1)]) {
            if (!resultsPD[(selector.faseNum - 1)]) {
                return;
            };
            const mathesLength = resultsPD[selector.faseNum - 1].matches.length - 1;
            return setSelector(selector => ({
                faseNum: selector.faseNum - 1,
                roundNum: mathesLength
            }));
        };

        return setSelector(selector => ({
            ...selector,
            roundNum: selector.roundNum - 1
        }));
    }

    const handleChangeRoundUp = () => {

        if (!resultsPD[selector.faseNum].matches[selector.roundNum + 1]) {
            if (!resultsPD[selector.faseNum + 1]) {
                return;
            };
            return setSelector(selector => ({
                faseNum: selector.faseNum + 1,
                roundNum: 0
            }));
        };

        return setSelector(selector => ({
            ...selector,
            roundNum: selector.roundNum + 1
        }));
    }

    return (
        <div className='resultados-container'>
            <div className='result-title'>
                <button value={-1} onClick={handleChangeRoundDown}>Jornda anterior</button>
                <h3>{
                    results.length > 0 ? (
                        selector.faseNum !== undefined ?
                            (results[0].league.round.replace('Phase -', 'Fase - Jornada')) :
                            ('Cargando...')
                    ) : ('Cargando')
                }</h3>
                <button value={+1} onClick={handleChangeRoundUp}>Jornada siguiente</button>
            </div>
            <div className='result-list'>
                {results.length > 0 ? (
                    results.map(res => {
                        return (
                            <Partido
                                key={results.indexOf(res)}
                                team1={res.teams.home.name}
                                team2={res.teams.away.name}
                                goals1={res.goals.home}
                                goals2={res.goals.away}
                                result={res.goals.home === null ? ('0 - 0') : (`${res.goals.home} - ${res.goals.away}`)}
                                status={res.fixture.status.long}
                                date={res.fixture.date}
                                city={res.fixture.venue.city}
                            />
                        )
                    })
                ) : ('')}
            </div>
        </div>
    )
}