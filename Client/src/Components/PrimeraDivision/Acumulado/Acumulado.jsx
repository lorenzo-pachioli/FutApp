import Board from '../Board/Board';
import { tempPosiciones } from '../Posiciones/tempPosiones';
import './Acumulado.css';

export default function Acumulado() {

    return <Board board={tempPosiciones} />
}