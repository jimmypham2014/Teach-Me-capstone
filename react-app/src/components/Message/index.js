import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Chat from '../Chat'
import {GoPerson} from 'react-icons/go'
import styled from '@emotion/styled'


export const StyleWrapper = styled.div`

.chat-container {
    width: 50rem;
   
    }
    
#scrollableDiv{
    height: 583.5px;
}

}
   
`

function Message(){

    const currentUser = useSelector(state=> state.session.user)
    const allMessages = useSelector(state=>Object.values(state.messages))
    const otherUsers = useSelector(state=> Object.values(state.otherUsers))
    const [userId, setUserId] = useState('')
    const [mostRecentMesage, setMostRecentMessage] = useState(null)
    const [username, setUserName] = useState('')


    console.log(mostRecentMesage)



     const handleClick = (userId, username)=>{
    
            setUserId(userId)
            setUserName(username)

    }

    const allMyMessages = allMessages.filter(message => message.recipient_id === currentUser.id)
    const senders = allMyMessages.map(message=> message.sender_id)
    const uniqueSenders =[...new Set(senders)]
  


    return (
        <div className ='flex justify-center w-full mt-[50px]  h-full' >
        <div className = 'border '>
        {otherUsers.map(user=>{
                return(
                    uniqueSenders.map(sender => user.id === sender? (

                    <div  >
                    
                      <div className='w-[300px] overflow-y-auto'>
                      <button className='flex items-center border shadow-xl bg-zinc-100 hover:bg-slate-100 w-full   active:bg-white focus:bg-white focus:borer-r-6 focus:border-r-black' onClick={()=> handleClick(user.id, user.username)}> 
                      <img  className='w-[40px] m-2 rounded-full ' src={user.profileImg ? user.profileImg : 'https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg' }/>
                      
                      <div className='focus:text-white'>{user.username}</div>

                      {mostRecentMesage?.user === user?.username &&
                        <div>{mostRecentMesage.msg}</div>
                        }

                
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

                <div className='  '>     
                <StyleWrapper>              
                <Chat userId = {userId} username = {username} setMostRecentMessage={setMostRecentMessage}/>
                </StyleWrapper>     
                </div> 

                </div>

              
            
        </div>
    )
}

export default Message