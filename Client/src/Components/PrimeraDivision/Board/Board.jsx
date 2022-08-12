import './Board.css';

export default function Board({board}) {
    let boardStand = [];
    if (board.standings ) {
        if ( board.standings[0]) {
            boardStand = board.standings[0];
            console.log(boardStand);
        }
        
    }
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
                {boardStand.length > 0 ? (
                        boardStand.map(pos => {
                            return (
                                <ul className='board-row' key={pos.rank}>
                                    <li className='width-15 tained-item'>{pos.rank}</li>
                                    <li id='align-left' className='width-35'>{pos.team.name}</li>
                                    <li className='width-5 tained-item'>{pos.all.played}</li>
                                    <li className='width-5'>{pos.all.win}</li>
                                    <li className='width-5'>{pos.all.draw}</li>
                                    <li className='width-5'>{pos.all.lose}</li>
                                    <li className='width-5'>{pos.all.goals.for}</li>
                                    <li className='width-5'>{pos.all.goals.against}</li>
                                    <li className='width-5'>{pos.all.goals.for - pos.all.goals.against >= 0 ? ('+'):('')}{pos.goalsDiff}</li>
                                    <li className='width-15 tained-item'>{pos.points}</li>
                                </ul>
                            )
                        })
                ):(<p>Loading...</p>)}
            </div>

        </div>
    )
}