import React, { useContext } from 'react';
import { AppContext } from '../../../../Context/AppContext';
import userPhoto from '../../../../assets/user.png'
import './UserCard.css';

export default function UserCard({ socket, id, img, online, chatId, photo }) {

    const { user, room, setRoom, chats, userList, newChat, setNewChat, unReadNum } = useContext(AppContext);

    const background = 'linear-gradient(178.18deg, #FD749B -13.56%, #281AC8 158.3%)';
    const borderNewChat = {
        border: '2px solid #858585'
    };

    const name = () => {
        const regEx1 = id.replace('{', '')
        const regEx2 = regEx1.replace('}', '')
        const nam = userList.find((u) => u._id === regEx2);
        return `${nam.firstName + ' ' + nam.lastName}`;
    };

    const handleMessages = async () => {
        if (newChat) {
            socket.emit("init_room", { otherUser: id, _id: user._id })
            return setNewChat(false);
        }
        if (id !== user._id) {
            setRoom(chats.find(chat => chat._id === chatId))
            socket.emit("read_msg", { _id: user._id, room_id: chatId })
        }
        socket.emit('log_user')
    };

    const UnRead = () => {
        if (id === user._id) {
            return <p style={{ background: 'white' }}></p>;
        }
        if (unReadNum.length === 0) {
            return <p style={{ background: 'white' }}></p>;
        }
        const unread = unReadNum.find((chat) => chat.chatId === chatId);
        if (unread) {
            if (unread.chatId === room._id) {
                return <p style={{ background: 'white' }}></p>;
            }
            if (unread.unRead.length > 0) {
                return <p style={{ background: background }}>{unread.unRead.length}</p>
            }
        }
    };

    return (
        <div className='userCard' id={id !== user._id ? ('otherUser') : ('user')} onClick={handleMessages} style={newChat && id !== user._id ? (borderNewChat) : ({})} >
            <div className='sub-userCard'>
                <div className='profile-img'>
                    {photo ? (
                        <img src={photo} className='img' alt='' />

                    ) : (
                        <img src={userPhoto} className='img' alt='' />
                    )
                    }
                    <span className='dot' style={{ 'backgroundColor': `${online ? ('#2e7d32') : ('darkGrey')}` }} />
                </div>
                <div className='name'>
                    {userList ? (userList.length > 0 ? (name()) : ('Loading...')) : ('Loading...')}
                </div>
            </div>
            <div className='msj-number'  >
                <UnRead />
            </div>
        </div>
    )
}
