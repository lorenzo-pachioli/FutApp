import React, {useContext, useState, useEffect} from 'react';
import { AppContext } from '../../../../Context/AppContext';
import Message from '../Message/Message';
import moment from 'moment';
import '../Chat.css';

export default function UnRead({socket}){
    const {user, room} = useContext(AppContext);
    const [unRead, setUnRead]= useState([]);
    
    useEffect(() => {
        const unRead = ()=>{
            if(room.messages && user._id){
                const unReadMsg = room.messages.filter((msj)=>{
                    if(msj.readBy.length > 1){
                        return false;
                    }
                    if(msj.readBy[0] !== user._id){
                        return false
                    }
                    return true;
                })
                const newRead = unReadMsg.sort((a, b)=>{return moment(a.time) > moment(b.time) })
                setUnRead(newRead);
            }
        }
        unRead();
    }, [room, user]);
    return (
        <div className='conversation' style={unRead.length > 0? ({display: 'flex'}):({display:'none'})}>
            <div className='unread'>
                <p>UNREAD</p>
                <hr />
            </div>
            {
            unRead.length > 0 ? (
                unRead.map((msj)=>{
                    return msj._id ? (
                        <Message key={msj._id} user={user} id={msj._id} date={msj.time} content={msj.message} postedBy={msj.user} socket={socket} />
                    ):('')
                })
            ):('')
            }
            
        </div>
        
    )
}