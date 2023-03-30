import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Chat from '../Chat'
import {GoPerson} from 'react-icons/go'





function Message(){

    const currentUser = useSelector(state=> state.session.user)
    const allMessages = useSelector(state=>Object.values(state.messages))
    const otherUsers = useSelector(state=> Object.values(state.otherUsers))
    const [userId, setUserId] = useState('')
    const [username, setUserName] = useState('')





     const handleClick = (userId, username)=>{
    
            setUserId(userId)
            setUserName(username)

     

    }

    const allMyMessages = allMessages.filter(message => message.recipient_id === currentUser.id)
    const senders = allMyMessages.map(message=> message.sender_id)
    const uniqueSenders =[...new Set(senders)]
  
    console.log(allMyMessages)

    return (
        <div className ='flex justify-center w-full mt-[100px]' >
        <div className = 'border '>
        {otherUsers.map(user=>{
                return(
                    uniqueSenders.map(sender => user.id === sender? (

                    <div >
                    
                      <div className='w-[300px] overflow-y-auto'>
                      <button className='flex items-center border shadow-xl hover:bg-slate-100 w-full' onClick={()=> handleClick(user.id, user.username)}> 
                      <img  className='w-[40px] m-2 rounded-full' src={user.profileImg}/>
                      {user.username}
                      
                
                      
                      </button>
                      </div>
                    
                    </div>
               
                    ):
                   null
                    )
                    )
            })}
            </div>
                <div className='flex flex-col'>
                    <div className='border flex h-8 items-center justify-center'> 


                        <GoPerson size={20}/>
                        <div>
                            {username && username}
                        </div>
                    
                </div>
                <div className=' h-full border '>                        
                <Chat userId = {userId} username = {username}/>
             
                </div> 

                </div>

              
            
        </div>
    )
}

export default Message