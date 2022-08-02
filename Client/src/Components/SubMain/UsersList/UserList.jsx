import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../../Context/AppContext';
import userPhoto from '../../../assets/user.png';
import UserCard from './UserCard/UserCard';
import './UserList.css';

export default function UserList({ socket }) {

    const { user, chats, setChats, userList, newChat, setNewChat } = useContext(AppContext);

    const findiD = (users) => {
        const id = users.find(id => id !== user._id.toString())
        return id;
    };

    const findUserOnline = (id) => {
        if (userList.length > 0) {
            const UID = userList.find(u => u._id.toString() === id)
            return UID ? UID.online:id;
        }
    };

    useEffect(() => {
        const newChat = () => {
            socket.on("init_room_res", data => {
                if (!data.status) {
                    return console.log(data.msg, ':', data.error);
                };
                if (data.otherUser === user._id) {
                    socket.emit("join_room", { _id: user._id, room_id: data.room._id })
                }
                if (data.room.users.find(id => id === user._id)) {
                    setChats(chat => {
                        if (chat.some(c => c._id === data.room._id)) {
                            return chat;
                        }
                        return [...chat, data.room]
                    });
                }
            });
        };
        newChat()
    }, [setChats, socket, user]);

    return (
        <div className='user-list'>
            <div className='sub-user-list' >
                {user ? (
                    <UserCard id={user._id} status={user.online ? ('online') : ('offline')} online={socket.connected} img={userPhoto} socket={socket} />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <div className='open-chats'>
                {newChat ? (
                    userList.length > 0 ? (
                        userList.map((u) => {
                            return u._id === user._id ? (false) : (<UserCard key={u._id} id={u._id} img={u.img} socket={socket} online={u.online} />)
                        })
                    ) : ('')

                ) : (
                    chats.length > 0 ? (
                        chats.map((u) => {
                            return (
                                <UserCard key={u._id} id={findiD(u.users)} online={socket.connected ? (findUserOnline(findiD(u.users))) : (false)} chatId={u._id} img={u.img} socket={socket} />
                            )
                        })
                    ) : ('')
                )}
            </div>
            <div className='new-chat' >
                <button onClick={() => setNewChat(!newChat)}>{newChat ? ('Back') : ('New chat')}</button>
            </div>
        </div>
    )
}
