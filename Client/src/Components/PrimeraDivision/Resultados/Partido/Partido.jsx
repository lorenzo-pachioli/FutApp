import './Partido.css';

export default function Partido({team1, team2, goals1, goals2, result, status, date}) {

    return (
        <div className='partido-container'>
            <div className='partido-subContainer'>
                <div className='team'>
                    <h2>{team1}</h2>
                    {goals1.map(goal => {
                        return (
                            <h3 key={goals1.indexOf(goal)}>{goal}</h3>
                        )
                    })}
                </div>
                <div className='result'>
                    <div>
                        <h2>{result}</h2>
                    </div>
                    <h3>{status}</h3>
                    <h3>{date}</h3>
                </div>
                <div className='team' style={{alignItems: 'flex-end'}}>
                    <h2>{team2}</h2>
                    {goals2.map(goal => {
                        return (
                            <h3 key={goals2.indexOf(goal)}>{goal}</h3>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}