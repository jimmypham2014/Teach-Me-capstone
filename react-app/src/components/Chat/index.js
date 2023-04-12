import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from 'socket.io-client';
import { getAllMesssages } from "../../store/messages";
import InfiniteScroll from "react-infinite-scroll-component"
import './Chat.css'
import {AiOutlineSend} from 'react-icons/ai'
import EmojiPicker, {EmojiClickData} from 'emoji-picker-react';
import smile from '../../icons/smile.png'
import styled from '@emotion/styled'
let socket;

export const Chat = ({userId, username, messagesEndRef}) => {
    const [chatInput, setChatInput] = useState("");
    const allMessages = useSelector(state=>Object.values(state.messages))
    const [page, setPage] = useState(1)
    const [messages, setMessages] = useState([]);
    const user = useSelector(state => state.session.user)
    const otherUsers =useSelector(state=> Object.values(state.otherUsers))
    const dispatch = useDispatch()
    const messagesRef = useRef(null)
    const [showPicker, setShowPicker] = useState(false)

    const specificMessagesinTheRoom = allMessages.filter(message=> message.roomId === String(userId+user.id))



    const receiver = otherUsers.filter(user =>user.id === userId)
 
    const StyleWrapper = styled.div`

.EmojiPickerReact.epr-main{
    position: absolute;
   bottom:3rem;
   right:1rem;
    }

   
   }
   `



 
    useEffect(() => {
        dispatch(getAllMesssages())
        // open socket connection
        // create websocket
        socket = io();
        console.log(socket,' sSOCKKKKKKKKKKKKKETTTTTTT')


        socket.on('connect', ()=>{
            socket.emit('join',{username: username, room:userId + user.id})
           
        })
        
        socket.on("receivedChat", (chat) => {
         
            setMessages(oldMessagesData => [...oldMessagesData, chat])
            console.log('Received Message')

          
           
        })
        socket.on('disconnect', ()=>{
            socket.emit('clinet disconnected')
        })
   
        return (() => {
            console.log('component unmounted')
            socket.disconnect()
        })
    }, [messages,dispatch,userId])

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
        console.log(userId, userId + user.id , 'sendd chat')
        socket.emit("chat", { user: user.username, msg: chatInput, recipientId: userId, room:userId + user.id});
        setMessages(preMessages => {
        
            return preMessages
        })
    
        setChatInput("")
    }


useEffect(()=>{
    messagesRef.current?.scrollIntoView()
},[messages])

const formatUTCDate = (date) =>{
    let myDate = new Date(date)
    return myDate.toLocaleString('en-US')
}

  
    
    return (user && (
        <div className='chat-container z-10'>
        <div
        id="scrollableDiv"
        style={{
       
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column-reverse',
        
        }}
       className='border'
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
                        <div className='flex justify-end bg-white z-10'>
                        <div className='from-me  m-2 '> 
                            <div className='flex items-center text-white'>
                               <img className='w-5 rounded-full m-1' src={user.profileImg}/> {user.username} : {message.body}  
                            </div>
                            

                            <div className='text-xs text-white flex justify-end'>
                            {formatUTCDate(message.timestamp)}                   
                            </div>
                    
                             </div>

                             </div>
                              :
                             <div className='flex justify-start'>

                            <div className='from-them m-2 '> 
                            

                            <div className='flex items-center text-black'>
                                 <img className='w-5 rounded-full m-1' src={receiver[0]?.profileImg}/>{receiver[0]?.username} : {message.body}  
                            </div>
                            
                            <div className='text-xs'>
                            {formatUTCDate(message.timestamp)}                   
                            </div>
                           
                    
                         </div> 

                            
                             </div>
                        
                             

                            
                    }
                
                    <div ref ={messagesEndRef}/>
                    <div ref= {messagesRef}/>
                        

                    </div>
                    
                ))}
                </InfiniteScroll>
    
            </div>
                    
            <div className='border '>
            <form onSubmit={sendChat} className='z-10'>

                <div className='flex items-center justify-evenly'>
                <div className='w-3/4' >
                <input
                className='border-none w-full h-[50px] rounded m-2'
                placeholder=' Write your message here'
                
                    value={chatInput}
                    onChange={updateChatInput}
                />
                </div>

               <div className='flex items-center justify-around w-[100px] '>
                <img
                className='w-6 h-6 cursor-pointer'
                    src={smile}
                    onClick={()=> setShowPicker(val => !val)}
                />
                {showPicker && 
                    <StyleWrapper>
                    <EmojiPicker
                    disableAutoFocus={true} native
                    pickerStyle = {{width:'90%'}}
                    onEmojiClick={onEmojiClick}
                    position='absolute'
                    />
                    </StyleWrapper>
                }

                  
                <button className='border border-black rounded-full flex items-center justify-center w-9 h-9 hover:bg-gray-100' type="submit"><AiOutlineSend size={20} color='black' /></button>
                </div>
              

                </div>
            </form>
            </div>
        </div>
    )
    )
};


export default Chat