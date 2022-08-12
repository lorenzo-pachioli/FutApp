import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../../Context/AppContext';
import { tempPosiciones } from './tempPosiones';
import Board from '../Board/Board';
import './Posiciones.css';

export default function Posiciones() {
    const { primeraDivision } = useContext(AppContext);
    console.log(primeraDivision);
    

    return <Board board={ primeraDivision } />
}