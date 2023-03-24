import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from 'socket.io-client';
import { getAllMesssages } from "../../store/messages";
let socket;

const Chat = ({userId, username}) => {
    const [chatInput, setChatInput] = useState("");
    const allMessages = useSelector(state=>Object.values(state.messages))
    const [messages, setMessages] = useState([]);
    const user = useSelector(state => state.session.user)
    const otherUsers =useSelector(state=> Object.values(state.otherUsers))
    const dispatch = useDispatch()

    console.log(userId)
    console.log(messages)

    const specificMessagesinTheRoom = allMessages.filter(message=> message.roomId === String(userId+user.id))
    console.log(specificMessagesinTheRoom ,'helloooo22')

    useEffect(() => {
        dispatch(getAllMesssages())
        // open socket connection
        // create websocket
        socket = io();
        console.log(socket)


        socket.on('connect', ()=>{
            socket.emit('join',{username: username, room:userId + user.id})
           
        })
              
        socket.on("receivedChat", (chat) => {
            console.log(messages)
            console.log(chat)
            // setMessages(messages => [...messages, chat])
            setMessages([...messages,chat])
            console.log('Received Message')
        })
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [messages])

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const sendChat = (e) => {
        e.preventDefault()
        socket.emit("chat", { user: user.username, msg: chatInput, recipientId: userId, room:userId + user.id});
       
        setChatInput("")
    }



    
    
    return (user && (
        <div>
        <div>
                {specificMessagesinTheRoom && specificMessagesinTheRoom.map((message, ind) => (
                    <div key={ind}>

                    {otherUsers.map(user=> user.id === message.sender_id ? <div className='flex pt-3'> <img className='w-5' src={user.profileImg}/>{`${user.username} : ${message.body}`}</div>:null )}

                       


                    <div className='text-sm'>
                    
                    {message.timestamp}                   
                    </div>
                    </div>
                    
                ))}
            </div>
         
            <form onSubmit={sendChat}>
                <input
                    value={chatInput}
                    onChange={updateChatInput}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    )
    )
};


export default Chat