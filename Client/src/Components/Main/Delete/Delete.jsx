import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../../Context/AppContext';
import { Navigate } from 'react-router-dom';
import userPhoto from '../../../assets/user.png';
import '../../../Pages/SubMain/SubMain.css';
import './Delete.css';

export default function Delete({ socket }) {
    const { user, chats, setChats, userList, setRoom } = useContext(AppContext);
    const [deleteChat, setDelete] = useState('')

    const findUserName = (userIds) => {
        if (userIds.length > 0 && userList.length > 0) {
            const UId = userIds.find((id) => {
                const regEx1 = id.replace('{', '')
                const regEx2 = regEx1.replace('}', '')
                return regEx2 !== user._id
            });
            const nam = userList.find((u) => {
                const regEx1 = UId.replace('{', '')
                const regEx2 = regEx1.replace('}', '')
                return u._id === regEx2
            });
            return `${nam.firstName + ' ' + nam.lastName}`;
        }
    }

    const handleDelete = () => {
        if (deleteChat.length > 0 && user._id) {
            socket.emit("delete_chat", { _id: user._id, room_id: deleteChat });
        }
    }

    useEffect(() => {
        const chatDelete = () => {
            socket.on("delete_chat_res", data => {
                if (!data.status) {
                    return console.log(data.msg, ':', data.error)
                }
                setChats(chat => chat.filter((chat) => chat._id !== deleteChat))
                setRoom({})
                setDelete('')
            })
        }
        chatDelete();
    }, [deleteChat, setChats, setRoom, socket]);

    return (
        <div className='sub-main'>
            <div className='sub-main-container' style={{ flexDirection: 'column' }} >
                <div className='delete-container'>
                    <div className='delete-title'>
                        <h1>Delete chat</h1>
                    </div>
                    <p>Wich chat would you like to delete:</p>
                    <div className='delete-chats'>
                        {chats.length > 0 ? (
                            chats.map((chat) => {
                                return (
                                    <div className='chat-card' key={chat._id} onClick={() => setDelete(chat._id)} style={deleteChat ? (deleteChat === chat._id ? ({ filter: 'brightness(80%)' }) : ({ filter: 'brightness(100%)' })) : ({})}>
                                        <img src={userPhoto} alt='' />
                                        <h3>{findUserName(chat.users)}</h3>
                                    </div>
                                )

                            })) : (<h3>You don't have any chats yet</h3>)
                        }
                    </div>
                    {deleteChat ? (
                        <button onClick={() => setDelete(false)} style={{ backgroundColor: '#858585' }}>Cancel</button>
                    ) : ('')}
                    {deleteChat ? (
                        <button onClick={handleDelete}>Delete</button>
                    ) : ('')}
                    {user._id ? (''):(<Navigate to='/' replace={true} />)}
                </div>
            </div>
        </div>
    )
}