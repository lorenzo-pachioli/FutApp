import React, { useState } from "react";

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
    const[user, setUser] = useState({})
    const[userList, setUserList] = useState({})
    const[token, setToken] = useState({})
    const[chats, setChats] = useState([])
    const[room, setRoom] = useState({})
    const[redirect, setRedirect] = useState(sessionStorage.getItem('email') && sessionStorage.getItem('password') ? (true):(false));
    const[loading, setLoading] = useState(false);
    const[logOut, setLogOut] = useState(false);
    const [newChat, setNewChat] = useState(false)
    const[unReadNum, setUnReadNum] = useState([])
    const [url, setUrl] = useState('')
    const [primeraDivision, setprimeraDivision] = useState({});
    const [resultsPD, setResultsPD] = useState([]);
   

    return (
        <AppContext.Provider
          value={{
              user,
              setUser,
              token,
              setToken,
              chats, 
              setChats, 
              room, 
              setRoom, 
              userList, 
              setUserList, 
              redirect, 
              setRedirect, 
              loading, 
              setLoading, 
              logOut, 
              setLogOut, 
              newChat, 
              setNewChat, 
              unReadNum, 
              setUnReadNum, 
              url, 
              setUrl,
              primeraDivision, 
              setprimeraDivision,
              resultsPD, 
              setResultsPD
          }}
        >
          {children}
        </AppContext.Provider>
      );
    }