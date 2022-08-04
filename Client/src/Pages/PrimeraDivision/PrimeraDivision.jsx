import React, { useContext, useEffect} from 'react';
import { AppContext } from '../../Context/AppContext';
import { Link, Navigate, Outlet, useLocation} from "react-router-dom";
import '../SubMain/SubMain.css';
import './PrimeraDivision.css';

export default function PrimeraDivision({socket}){

    const { setRoom, setChats } = useContext(AppContext);
    const history = useLocation();

    return(
        <div className='sub-main'>
            <div className='primraDivision-container'>
                <div className='boardTitle'>
                    <h1>Primera Division</h1>
                </div>
                
                <div className='boardSelector'>
                    <Link to='' className='board-button' style={history.pathname === '/chatapp' ? {filter: 'brightness(70%)'}:{}}>
                        <div>
                            <p>Resultados</p>
                        </div>
                    </Link>
                    <Link to='posiciones' className='board-button' style={history.pathname === '/chatapp/posiciones' ? {filter: 'brightness(70%)'}:{}} >
                        <div>
                            <p>Posiciones</p>
                        </div>
                    </Link>
                    <Link to='promedios' className='board-button' style={history.pathname === '/chatapp/promedios' ? {filter: 'brightness(70%)'}:{}} >
                        <div>
                            <p>Promedios</p>
                        </div>
                    </Link>
                    <Link to='acumulado' className='board-button' style={history.pathname === '/chatapp/acumulado' ? {filter: 'brightness(70%)'}:{}} >
                        <div>
                            <p>Acumulado</p>
                        </div>
                    </Link>
                </div>
                <Outlet />
            </div>
        </div>
    )
}
