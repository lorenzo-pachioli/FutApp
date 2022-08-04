import { tempPosiciones } from './tempPosiones';
import Board from '../Board/Board';
import './Posiciones.css';

export default function Posiciones() {

    return <Board board={ tempPosiciones } />
}