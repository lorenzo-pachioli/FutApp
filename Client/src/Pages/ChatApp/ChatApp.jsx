import React, { useEffect, useContext } from 'react';
import { Navigate } from "react-router-dom";
import { AppContext } from '../../Context/AppContext';
import TopBar from '../../Components/Topbar/TopBar';
import Main from '../Main/Main';
import './ChatApp.css';

export default function ChatApp({ socket }) {
	const { user, chats, setUnReadNum, setRoom, setChats } = useContext(AppContext);

	//All un read messages amount

	useEffect(() => {
		const unRead = chats.map((chat) => {
			const unreadMsj = chat.messages.filter((msj) => {
				if (msj.readBy.length > 1) {
					return false
				}
				
				if (msj.readBy.some((u) => u === user._id)) {
					return false;
				}
				return true;
			})
			return { chatId: chat._id, unRead: unreadMsj }
		})
		if (user._id) {
			setUnReadNum(unRead);
		}
		
	}, [chats, user, setUnReadNum]);

	const inHeight = {
		height: window.innerHeight
	};

	useEffect(() => {
		const msgDelete = () => {
			socket.on("delete_msg_res", data => {
				if (!data.status) {
					return console.log(data.msg, ':', data.error);
				}
				setRoom(data.room);
				setChats((chat) => chat.map((c) => c._id === data.room._id ? (data.room) : (c)));
			})
		}
		msgDelete();
	}, [setRoom, socket, setChats]);

	return (
			<div className="ChatApp" style={inHeight} >
				<TopBar socket={socket} />
				<Main socket={socket} />
			</div>
	);
}
