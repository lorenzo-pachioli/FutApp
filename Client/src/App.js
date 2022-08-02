import React, { useEffect, useContext } from 'react';
import { Route, Routes } from "react-router-dom";
import ChatApp from './Pages/ChatApp/ChatApp';
import Login from './Pages/Login/Login';
import LoginBtn from './Components/Login/Log in/LoginBtn';
import Options from './Components/Login/Options/Options';
import SignIn from './Components/Login/Sign in/SignIn';
import Complaints from './Components/Main/Complaints/Complaints';
import Delete from './Components/Main/Delete/Delete';
import DeleteAcount from './Components/Main/DeleteAcount/DeleteAcount';
import SubMain from './Pages/SubMain/SubMain';
import { AppContext } from './Context/AppContext';
import io from 'socket.io-client';
import env from 'react-dotenv';
import './App.css';

const socket = io.connect(env.SOCKET_URL)
/* const socket = io.connect("http://localhost:3001") */

function App() {

	const { user, loading, setLoading, setChats, setUser, setUserList, setRoom } = useContext(AppContext);
	const userId = user._id;

	//log in
	useEffect(() => {
		const logIn = async () => {
			socket.on("log_in_res", (data) => {
				if (!data.status) {
					return console.error(data.msg, ':', data.error)
				}
				console.log(data.user)
				setUser(user => {
					if (user._id) {
						return user;
					}
					sessionStorage.setItem('email', `${data.user.email}`);
					return data.user;
				})
				setChats(chat => {
					if (chat.length > 0) {
						return chat;
					}
					return data.rooms;
				})
			});
		}

		logIn();
	}, [setUser, setChats]);

	//On page re load set user

	useEffect(() => {
		const tempEmail = sessionStorage.getItem('email');
		const tempPass = sessionStorage.getItem('password');
		const onReload = () => {
			if (loading) {
				return '';
			}

			if (user._id === undefined && tempEmail && tempPass) {
				try {
					console.log('re load app');
					socket.emit("log_in", {
						email: tempEmail,
						password: tempPass,
						online: true
					});
				} catch (err) {
					console.log(`Something went wrong on reloading page, error: ${err}`)
				}
			}
		}
		onReload()
	}, [user, loading]);

	//log out 

	useEffect(() => {
		const logOut = () => {
			socket.on('disconnect', data => {
				return console.log('disconnect', data)
			});
		}
		const connect = () => {
			socket.on('connect', data => {
				return console.log('connect', data)
			});
		}
		connect();
		logOut();
	}, [user]);

	//get users list

	useEffect(() => {
		const getUser = async () => {
			socket.on("get_users_res", data => {
				if (!data.status) {
					return console.log(data.msg, ':', data.error)
				}
				setUserList(data.users);
			})
		}
		getUser();
	}, [setUserList]);

	//users online

	useEffect(() => {
		const onlineUser = async () => {
			socket.on("online_res", data => {
				if (!data.status) {
					return console.log(data.msg, ':', data.error)
				}
				console.log("online_res", data)
				setUserList(user => user.length > 0 ? (user.map(u => u._id === data.user._id ? (data.user) : (u))) : (user));
			})
		}
		onlineUser();
	}, [setUserList]);

	//delete user response

	useEffect(() => {
		const userDeleted = () => {
			socket.on("delete_user_res", (data) => {
				if (!data.status) {
					return console.log(data.msg, ':', data.error)
				}

				if (data.userDeleted._id === userId) {
					setLoading(false)
					setUser({})
					sessionStorage.setItem('password', '');
					sessionStorage.setItem('email', '');
					return true;
				}
				setUserList(data.users);
				setChats(chats => {
					if (chats.length === 0) {
						return [];
					}
					return chats.filter(chat => !chat.users.some(u=> u === data.userDeleted._id));
					
				})
				setRoom((r) => {
					if (!r._id) {
						return {};
					}
					if (r.users.some(uid => uid === data.userDeleted._id)) {
						return {};
					}
					return r;
				})

			})
		}
		userDeleted();
	}, [setLoading, setUser, setChats, userId, setUserList, setRoom]);

	return (
		<div className="App">
			<Routes>
				<Route>
					<Route path="chatapp" element={<ChatApp socket={socket} />} >
						<Route path="complaints" element={<Complaints socket={socket} />} />
						<Route path="delete" element={<Delete socket={socket} />} />
						<Route path="deleteAcount" element={<DeleteAcount socket={socket} />} />
						<Route path="" element={<SubMain socket={socket} />} />
					</Route>
				</Route>
				<Route>
					<Route exact path="/" element={<Login />}>
						<Route path="signin" element={<SignIn socket={socket} />} />
						<Route path="login" element={<LoginBtn socket={socket} />} />
						<Route path="" element={<Options />} />
					</Route>
				</Route>
			</Routes>

		</div>
	);
}

export default App;
