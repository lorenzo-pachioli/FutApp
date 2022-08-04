import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../../Context/AppContext';
import { Navigate } from 'react-router-dom';
import userPhoto from '../../../assets/user.png';
import '../../../Pages/SubMain/SubMain.css';
import '../Delete/Delete.css';

export default function DeleteAcount({ socket }) {
    const { user, setLogOut, setUser, setUserList, setToken, setRedirect, setChats, setRoom, setLoading, setUnReadNum } = useContext(AppContext);
    const [password, setPassword] = useState('');
    const userId = user._id;

    const handleDelete = () => {
        if (password.length > 0 && user._id) {
            console.log(user.email, password)
            socket.emit("delete_user", { email: user.email, password: password });
        }
    }

    useEffect(() => {
        const acountDelete = () => {
            socket.on("delete_user_res", data => {
                if (!data.status) {
                    return console.log(data.msg, ':', data.error)
                }
                if (data.userDeleted._id === userId) {
                    setLogOut(true)
                    setUser({})
                    setUserList({})
                    setToken({})
                    setRedirect(false)
                    setChats([])
                    setRoom({})
                    setLoading(false)
                    setUnReadNum([])
                    sessionStorage.setItem('password', ``);
                    sessionStorage.setItem('email', ``);
                    setTimeout(() => {
                        setLogOut(false)
                    }, 1000);
                }

            })
        }
        acountDelete();
    }, [userId, setLogOut, setUser, setUserList, setToken, setRedirect, setChats, setRoom, setLoading, setUnReadNum, socket]);

    return (
        <div className='sub-main'>
            <div className='sub-main-container' style={{ flexDirection: 'column' }} >
                <div className='delete-container'>
                    <div className='delete-title'>
                        <h1>Delete acount</h1>
                    </div>
                    <p>Are you shoure yo want to delete your acount and the chats in it?</p>
                    <div className='delete-chats' style={{ overflowX: 'unset' }}>
                        <div className='acount-card'>
                            <img src={userPhoto} alt='' />
                            <div>
                                <h3>{user.firstName} {user.lastName}</h3>
                                <h4>{user.email}</h4>
                            </div>
                        </div>
                    </div>
                    <input type='password' className='password' value={password} placeholder='Password' onChange={e => setPassword(e.target.value)} />
                    <button onClick={handleDelete} style={{ 'backgroundColor': '#f50d5ac4' }}>Delete</button>
                    {user._id ? (''):(<Navigate to='/' replace={true} />)}
                </div>
            </div>
        </div>
    )
}