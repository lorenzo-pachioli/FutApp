import { tempResult } from './tempResults';
import Partido from './Partido/Partido';
import './Resultados.css';

export default function Resultados() {

    return (
        <div className='resultados-container'>
            <div className='result-title'>
                <button>Jornda anterior</button>
                <h3>Jornada 27</h3>
                <button>Jornada siguiente</button>
            </div>
            <div className='result-list'>
                {tempResult.map(res => {
                    return (
                        <Partido
                            key={tempResult.indexOf(res)}
                            team1={res.team1}
                            team2={res.team2}
                            goals1={res.goals1}
                            goals2={res.goals2}
                            result={res.result}
                            status={res.status}
                            date={res.date}
                        />
                    )
                })}
            </div>
        </div>
    )
}