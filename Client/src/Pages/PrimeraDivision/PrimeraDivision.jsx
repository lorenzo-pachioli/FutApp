import React, { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../../Context/AppContext';
import { Link, Outlet, useLocation } from "react-router-dom";
import axios from 'axios';
import env from 'react-dotenv';
import '../SubMain/SubMain.css';
import './PrimeraDivision.css';

export default function PrimeraDivision({ socket }) {

    const { setprimeraDivision, setResultsPD } = useContext(AppContext);
    const history = useLocation();
    const fetchmade = useRef(false);

    useEffect(() => {
        function getData() {
            const LPA = ['128', '2022'];
            const endPoint1 = 'http://localhost:3001'
            console.time('time 1');
            const fect1 = axios.get(endPoint1 + `/standings?league=${LPA[0]}`)
            const fect2 = axios.get(endPoint1 + `/fixtures?league=${LPA[0]}`)

            Promise.all([fect1, fect2])
                .then(([fect1, fect2]) => {
                    /* console.log(fect2); */
                    if (fect1.status === 200) {
                        if (fect1.data.success) {
                            setprimeraDivision(fect1.data.content.league);
                        }
                    }

                    if (fect2.status === 200) {
                        if (fect2.data.success) {
                            console.timeEnd('time 1');
                            setResultsPD(fect2.data.content);
                            
                        }
                    }
                })
                .catch(err => console.log('error:', err));
        }

        if (!fetchmade.current) {
            fetchmade.current = true;
            getData()
        };
        
    }, [setResultsPD, setprimeraDivision]);

    return (
        <div className='sub-main'>
            <div className='primraDivision-container'>
                <div className='boardTitle'>
                    <h1>Primera Division</h1>
                </div>

                <div className='boardSelector'>
                    <Link to='' className='board-button' style={history.pathname === '/chatapp' ? { filter: 'brightness(70%)' } : {}}>
                        <div>
                            <p>Resultados</p>
                        </div>
                    </Link>
                    <Link to='posiciones' className='board-button' style={history.pathname === '/chatapp/posiciones' ? { filter: 'brightness(70%)' } : {}} >
                        <div>
                            <p>Posiciones</p>
                        </div>
                    </Link>
                    <Link to='promedios' className='board-button' style={history.pathname === '/chatapp/promedios' ? { filter: 'brightness(70%)' } : {}} >
                        <div>
                            <p>Promedios</p>
                        </div>
                    </Link>
                    <Link to='acumulado' className='board-button' style={history.pathname === '/chatapp/acumulado' ? { filter: 'brightness(70%)' } : {}} >
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
