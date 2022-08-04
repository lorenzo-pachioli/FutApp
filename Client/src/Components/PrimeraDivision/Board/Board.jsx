import './Board.css';

export default function Board({board}) {

    return (
        <div className='posiciones-container'>
            <ul className='posiciones-title'>
                <li className='width-15'>Pos</li>
                <li className='width-35'>Equipo</li>
                <li className='width-5'>PJ</li>
                <li className='width-5'>G</li>
                <li className='width-5'>E</li>
                <li className='width-5'>P</li>
                <li className='width-5'>GF</li>
                <li className='width-5'>GC</li>
                <li className='width-5'>DG</li>
                <li className='width-15'>Pts</li>
            </ul>
            <div className='posiciones-board'>
                {board.map(pos => {
                    return (
                        <ul className='board-row' key={pos.pos}>
                            <li className='width-15 tained-item'>{pos.pos}</li>
                            <li id='align-left' className='width-35'>{pos.equipo}</li>
                            <li className='width-5 tained-item'>{pos.pj}</li>
                            <li className='width-5'>{pos.g}</li>
                            <li className='width-5'>{pos.e}</li>
                            <li className='width-5'>{pos.p}</li>
                            <li className='width-5'>{pos.gf}</li>
                            <li className='width-5'>{pos.gf}</li>
                            <li className='width-5'>{pos.dg}</li>
                            <li className='width-15 tained-item'>{pos.pts}</li>
                        </ul>
                    )
                })}
            </div>

        </div>
    )
}