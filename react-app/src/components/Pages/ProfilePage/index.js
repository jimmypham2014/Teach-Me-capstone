import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

function ProfilePage(){
    const currentUser = useSelector(state => state.session.user)
    
    return(
    
    
        <div className='profile_container'>
            {currentUser && (

                <div>
                    <img src={currentUser.profileImg}/>
                    {currentUser.firstName} {currentUser.lastName}



                    <NavLink exact to={`/${currentUser.username}/edit`}> Edit</NavLink>
                </div>

             
                
            )}

            
            


        
        
        </div>



    )


}

export default ProfilePage