import { tempPromedios } from './tempPromedios';
import './Promedios.css';

export default function Promedios() {
    return (
        <div className='promedios-container'>
            <ul className='promedios-title' id='tained-item-prom'>
                <li className='width-15'>Pos</li>
                <li className='width-35'>Equipo</li>
                <li className='width-7'>2020</li>
                <li className='width-7'>2021</li>
                <li className='width-7'>2022</li>
                <li className='width-7'>Pts</li>
                <li className='width-7'>PJ</li>
                <li className='width-15'>Prom</li>
            </ul>
            <div className='promedios-board'>
                {tempPromedios.map(pos => {
                    return (
                        <ul className='board-row-prom' key={pos.pos} id={pos.pos%2 === 0 ? ('tained-item-prom'):('')}>
                            <li className='width-15 '>{pos.pos}</li>
                            <li id='align-left' className='width-35'>{pos.equipo}</li>
                            <li className='width-7 '>{pos.year1}</li>
                            <li className='width-7'>{pos.year2}</li>
                            <li className='width-7'>{pos.year3}</li>
                            <li className='width-7'>{pos.Pts}</li>
                            <li className='width-7'>{pos.PJ}</li>
                            <li className='width-15 '>{pos.Prom}</li>
                        </ul>
                    )
                })}
            </div>

        </div>
    )
}