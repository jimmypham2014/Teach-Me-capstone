import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import EditProfile from '../../Forms/EditProfile'
import OpenModalButton from '../../OpenModalButton'

function ProfilePage(){
    const currentUser = useSelector(state => state.session.user)
    const [showMenu, setShowMenu] = useState(false);
    
    const closeMenu = () => setShowMenu(!showMenu);

    console.log(currentUser.description)
    return(
    
    
        <div className='profile_container'>
            {currentUser && (

                <div>
                    <img src={currentUser.profileImg}/>
                    {currentUser.firstName} {currentUser.lastName}
                    
                    <div>
                    {currentUser.description}
                    </div>


                    <OpenModalButton
                        buttonText='Edit'
                        onItemClick={closeMenu}
                        modalComponent={<EditProfile userId={currentUser.id} />}
                    
                    
                    
                    />
                    
                    
                   
                </div>

             
                
            )}

            
            


        
        
        </div>



    )


}

export default ProfilePage