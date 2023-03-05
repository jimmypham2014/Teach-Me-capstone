import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import icon from '../../../icons/fiverr.png'
import LoginFormModal from '../../LoginFormModal'

import OpenModalButton from '../../OpenModalButton'
import SignupFormModal from '../../SignupFormModal'
import './HomePage.css'

function HomePage(){
    const dispatch = useDispatch();
    const ulRef = useRef();
    const history =useHistory()
    const [showMenu, setShowMenu] = useState(false);


    useEffect(() => {
        if (!showMenu) return;
    
        const closeMenu = (e) => {
          if (!ulRef.current.contains(e.target)) {
            setShowMenu(false);
          }
        };
    
        document.addEventListener("click", closeMenu);
    
        return () => document.removeEventListener("click", closeMenu);
      }, [showMenu]);

 const closeMenu = () => setShowMenu(false);

    return(
        <div className= 'home-page_container'>
        <div id='background_img'></div>
        <div className= 'home_page_header'>

            <div className= 'home_page_icon'>
                Icon
            </div>


            <div className = 'home_page_login'>

            <div>

            <button onClick={()=>history.push('/tutorsignup')}>Become a Tutor</button>
        
            </div>

            <div className = 'login'>
            <OpenModalButton
              buttonText="Sign In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            </div>
            <div className='join'>
            <OpenModalButton
              buttonText="Join"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
            
            </div>

              
            </div>
        </div>

            <div>  Welcome to      </div>


        </div>

    )

}

export default HomePage