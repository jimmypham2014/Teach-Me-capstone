import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from 'socket.io-client';
import { getAllMesssages } from "../../store/messages";
import InfiniteScroll from "react-infinite-scroll-component"
import './Chat.css'
import {AiOutlineSend} from 'react-icons/ai'
import data from '@emoji-mart/data'
import EmojiPicker, {EmojiClickData} from 'emoji-picker-react';
import smile from '../../icons/smile.png'

let socket;

const Chat = ({userId, username}) => {
    const [chatInput, setChatInput] = useState("");
    const allMessages = useSelector(state=>Object.values(state.messages))
    const [page, setPage] = useState(1)
    const [messages, setMessages] = useState([]);
    const user = useSelector(state => state.session.user)
    const otherUsers =useSelector(state=> Object.values(state.otherUsers))
    const dispatch = useDispatch()
    const messagesEndRef = useRef(null)
    const [showPicker, setShowPicker] = useState(false)


    const specificMessagesinTheRoom = allMessages.filter(message=> message.roomId === String(userId+user.id))

    const otherUserMessages = specificMessagesinTheRoom.filter(el => el.sender_id !== user.id && el.sender_id !== null )
    console.log(otherUserMessages)

    const receiver = otherUsers.filter(user =>user.id === userId)
    console.log(receiver)

 
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

    const onEmojiClick =(emojiObject,event)=>{
        console.log('hi thereeeee')
        console.log(emojiObject.emoji)
        setChatInput(prevInput => prevInput + emojiObject.emoji);
        setShowPicker(false)
    }

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const sendChat = (e) => {
        e.preventDefault()
        socket.emit("chat", { user: user.username, msg: chatInput, recipientId: userId, room:userId + user.id});
       
        setChatInput("")
    }


useEffect(()=>{
    messagesEndRef.current?.scrollIntoView()
},[messages])



  
    
    return (user && (
        <div >
        <div
        id="scrollableDiv"
        style={{
          height: 300,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column-reverse',
        }}
        >
               <InfiniteScroll
               dataLength = {specificMessagesinTheRoom.length}
               next={()=> setPage(page+1)}
               inverse={true} //
               hasMore={true}
               scrollableTarget="scrollableDiv"

               >
                {specificMessagesinTheRoom && specificMessagesinTheRoom.map((message, ind) => (
                    <div key={ind}>
                    
                    
                    {user.id === message.sender_id ? 
                        <div className='flex justify-end'>
                        <div className='from-me  m-2'> 
                            <div className='flex items-center text-white'>
                               <img className='w-5 rounded-full m-1' src={user.profileImg}/> {user.username} : {message.body}  
                            </div>
                            

                            <div className='text-xs text-white flex justify-end'>
                            {message.timestamp}                   
                            </div>
                    
                             </div>

                             </div>
                              :
                             <div className='flex justify-start'>

                            <div className='from-them m-2 '> 
                            

                            <div className='flex items-center text-black'>
                                 <img className='w-5 rounded-full m-1' src={receiver[0].profileImg}/>{receiver[0].username} : {message.body}  
                            </div>
                            
                            <div className='text-xs'>
                            {message.timestamp}                   
                            </div>
                           
                    
                         </div> 
                             </div>
                        

                         
                }

                    

                    

                   
                        <div ref ={messagesEndRef}/>

                    </div>
                    
                ))}
                </InfiniteScroll>
    
            </div>
         
            <form onSubmit={sendChat}>
                <input
                className='border w-5/6 h-[50px] rounded m-2'
                placeholder=' Write your message here'
                
                    value={chatInput}
                    onChange={updateChatInput}
                />
                <img
                className='w-6'
                    src={smile}
                    onClick={()=> setShowPicker(val => !val)}
                />
                {showPicker && <EmojiPicker
                    disableAutoFocus={true} native
                    pickerStyle = {{width:'90%'}}
                    onEmojiClick={onEmojiClick}
                    />}
        
                <button type="submit"><AiOutlineSend/></button>
            </form>
        </div>
    )
    )
};


export default Chat