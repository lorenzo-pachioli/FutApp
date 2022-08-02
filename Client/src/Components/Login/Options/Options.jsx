import React, { useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import { AppContext } from '../../../Context/AppContext';
import './Options.css';

export default function Options() {
	const { setUser, setRedirect, setLoading } = useContext(AppContext);

	useEffect(() => {
		console.log('options')
		setLoading(false)
		setUser({})
		sessionStorage.setItem('password', '');
		sessionStorage.setItem('email', '');
	}, [setUser, setRedirect, setLoading]);

	return (
		<div className="Options">
			<Link to="/signin" className='link' > Sign in </Link>
			<Link to="/login" className='link' > Log in </Link>
		</div>
	);
}