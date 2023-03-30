import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Chat from '../Chat'
import styled from '@emotion/styled'


export const StyleWrapper = styled.div`

.chat-container {
    width: 50rem;
    }
    
#scrollableDiv{
    height: 600px;
}

}
`

function Message(){

    const currentUser = useSelector(state=> state.session.user)
    const allMessages = useSelector(state=>Object.values(state.messages))
    const otherUsers = useSelector(state=> Object.values(state.otherUsers))
    const [userId, setUserId] = useState('')
    const [username, setUserName] = useState('')
    const [buttonStatus, setButtonStatus] = useState(false);




     const handleClick = (userId, username)=>{
    
            setUserId(userId)
            setUserName(username)

     

    }

    const allMyMessages = allMessages.filter(message => message.recipient_id === currentUser.id)



    const senders = allMyMessages.map(message=> message.sender_id)
   
    const uniqueSenders =[...new Set(senders)]
  

    return (
        <div className ='flex justify-center w-full border border-red-200' >
        <div className = 'border w-0'>
        {otherUsers.map(user=>{
                return(
                    uniqueSenders.map(sender => user.id === sender? (

                    <div >
                 
                      <div className='w-[700px]'>
                      <button className='flex items-center border border-black w-[200px]' onClick={()=> handleClick(user.id, user.username)}> <img  className='w-[40px] m-2 rounded-full' src={user.profileImg}/>{user.username}</button>
                      </div>
                    
                    </div>
               
                    ):
                   null
                    )
                    )
            })}
            </div>
                
                <div className='flex h-full '>
                
                <StyleWrapper>
                <Chat userId = {userId} username = {username}/>
                </StyleWrapper>
                
                </div> 

              
            
        </div>
    )
}

export default Message