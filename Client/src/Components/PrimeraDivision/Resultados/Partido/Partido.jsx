import moment from 'moment';
import './Partido.css';

export default function Partido({ team1, team2, goals1, goals2, result, status, date, city }) {

    return (
        <div className='partido-container'>
            <div className='partido-subContainer'>
                <div className='team'>
                    <h2>{team1}</h2>
                </div>
                <div className='result'>
                    <div>
                        <h2>{result}</h2>
                    </div>
                    <h3>{status}</h3>
                    <h3>{moment(date).format('MMMM Do YYYY, h:mm:ss a')}</h3>
                    <h3>{city}</h3>
                </div>
                <div className='team' style={{ alignItems: 'flex-end' }}>
                    <h2>{team2}</h2>
                </div>
            </div>
        </div>
    )
}