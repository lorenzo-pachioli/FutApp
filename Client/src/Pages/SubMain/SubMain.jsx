import React, { useContext, useEffect} from 'react';
import { AppContext } from '../../Context/AppContext';
import Chat from '../../Components/SubMain/Chat/Chat';
import UserList from '../../Components/SubMain/UsersList/UserList';
import './SubMain.css';

export default function SubMain({socket}){

    const { setRoom, setChats } = useContext(AppContext);

    useEffect(() => {
        const newMessage = ()=>{
            socket.on("send_msg_res", data=>{
                if(!data.status){
                    return console.log(data.msg,':', data.error)
                }
                setChats((chat)=>chat.map((c)=>c._id===data.room._id?(data.room):(c)))
            })
        }
        newMessage();
    }, [setChats, socket, setRoom]);
     
    return(
        <div className='sub-main'>
            <div className='sub-main-container'>
                <UserList socket={socket} />
                <Chat socket={socket}/>
            </div>
        </div>
    )
}
