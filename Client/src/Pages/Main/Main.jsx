import React, { useEffect, useContext } from 'react';
import { AppContext } from '../../Context/AppContext';
import ControlPanel from '../../Components/Main/ControlPanel/ControlPanel';
import { Navigate } from "react-router-dom";
import './Main.css';
import { Outlet } from 'react-router-dom';

export default function Main({ socket }) {
    const { setRedirect, setLoading } = useContext(AppContext);

    useEffect(() => {
        setLoading(false)
        setRedirect(false);
    }, [setRedirect, setLoading]);

    return (
        <div className='main' >
            <ControlPanel socket={socket} />
            <Outlet />
        </div>
    )
}