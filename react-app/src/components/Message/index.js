import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Chat from '../Chat'




function Message(){

    const currentUser = useSelector(state=> state.session.user)
    const allMessages = useSelector(state=>Object.values(state.messages))
    const otherUsers = useSelector(state=> Object.values(state.otherUsers))
    const [userId, setUserId] = useState('')
    const [username, setUserName] = useState('')
    const [buttonStatus, setButtonStatus] = useState(false);

    console.log(username)


     const handleClick = (userId, username)=>{
    
            setUserId(userId)
            setUserName(username)

     

    }

    const allMyMessages = allMessages.filter(message => message.recipient_id === currentUser.id)



    const senders = allMyMessages.map(message=> message.sender_id)
   
    const uniqueSenders =[...new Set(senders)]
  

    return (
        <div >
        <div >
        {otherUsers.map(user=>{
                return(
                    uniqueSenders.map(sender => user.id === sender? (

                    <div >
                 
                      <div >
                      <button  onClick={()=> handleClick(user.id, user.username)}>{user.username}</button>
                      </div>
                    
                    </div>
               
                    ):
                   null
                    )
                    )
            })}
                
                <div className='flex'>
                <Chat userId = {userId} username = {username}/>
                
                </div> 

                </div>
            
        </div>
    )
}

export default Message