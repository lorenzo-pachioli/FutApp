import React, {useContext, useState, useEffect} from 'react';
import { AppContext } from '../../../../Context/AppContext';
import Message from '../Message/Message';
import moment from 'moment';
import '../Chat.css';

export default function Read({socket}){
    const {user, room} = useContext(AppContext);
    const [read, setRead]= useState([]);

    useEffect(() => {
       const read = ()=>{
            if(room._id && user._id){
                const readMsg = room.messages.filter((msj)=>{
                    if(!msj._id){
                        return false;
                    }
                    if(msj.readBy.length >= 2){
                        return true;
                    }
                    if(msj.readBy[0] !== user._id){
                        socket.emit("read_msg", {_id:user._id, room_id:room._id})
                        return true;
                    }
                    
                    return false;
                })
                const newRead = readMsg.sort((a, b)=>{return moment(a.time) > moment(b.time) })
                setRead(newRead);
            }
       }
       read();
    }, [room, user, socket]);

    
    
    return (
        <div className='conversation'>
            {read.length > 0? (
                read.map((msj)=>{
                    return msj._id ? (
                        <Message key={msj._id} user={user} id={msj._id} date={msj.time} content={msj.message} postedBy={msj.user} socket={socket} />
                    ):('')
                })
            ):('')}
        </div>
    )
}
