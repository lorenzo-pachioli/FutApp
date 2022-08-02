import React, {useContext} from 'react';
import { AppContext } from '../../../Context/AppContext';
import { Link, Navigate} from "react-router-dom";
import logout from '../../../assets/logout.svg';
import chat from '../../../assets/chat-bubble.svg';
import customerService from '../../../assets/customer-service.svg';
import deleteMsg from '../../../assets/delete-message.svg';
import deleteAcount from '../../../assets/delete-person.svg';
import './ControlPanel.css';

export default function ControlPanel({socket}){

    const {user, logOut, setLogOut, unReadNum, setUser, setUserList, setToken, setRedirect, setChats,setRoom, setLoading, setUnReadNum} = useContext(AppContext);

    const handleLogOut = async ()=>{
        try{
            await socket.emit("online", {email:user.email, password:sessionStorage.getItem('password'), online:false})
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
        }catch(err){
            console.error(`Error: ${err}`)
        }
    }
    const UnRead = ()=>{
        if(unReadNum.length > 0){
            const unread = unReadNum.filter((chat)=> chat.unRead.length > 0 );
            if(unread.length > 0){
                return (
                    <div>
                        <p className='sub-num'>{ unread.length}</p>
                    </div>
                )
            }
        }
    }

    return(
        <div className='control-panel'>
            <div className='sub-control-panel'>
                <Link to='/chatapp' className='chat-message'>
                    <div>
                        <img src={chat} alt='' />
                        <p>Chat</p>
                    </div>
                    
                    <div className='num'>
                        <UnRead />
                    </div>
                </Link>
                <Link to='/chatapp/complaints' className='chat-message'>
                    <div>
                        <img src={customerService} alt='' />
                        <p>Complaints</p>
                    </div>
                    
                </Link>
                <Link to='/chatapp/delete' className='chat-message'>
                    <div>
                        <img src={deleteMsg} fill='white' alt='' />
                        <p>Delete chat</p>
                    </div>
                    
                </Link>
                <Link to='/chatapp/deleteAcount' className='chat-message'>
                    <div>
                        <img src={deleteAcount} fill='white' alt='' />
                        <p>Delete acount</p>
                    </div>
                    
                </Link>
            </div>
            <button className='logout' onClick={handleLogOut}>
                <img src={logout} alt='' />
                <p>Loggout</p>
            </button>
            {logOut ? (<Navigate to='/' replace={true} />):('')}
        </div>
    )
}