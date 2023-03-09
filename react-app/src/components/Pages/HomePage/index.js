import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import icon from '../../../icons/fiverr.png'
import LoginFormModal from '../../LoginFormModal'

import OpenModalButton from '../../OpenModalButton'
import SignupFormModal from '../../SignupFormModal'
import './HomePage.css'
import globalIcon from '../../../icons/Black logo - no background.png'
import {login} from '../../../store/session'

function HomePage(){
    const dispatch = useDispatch();
    const ulRef = useRef();
    const history =useHistory()
    const [showMenu, setShowMenu] = useState(false);

    const demo = async (e) => {
      e.preventDefault();
      const user = {
        email: "demo@aa.io",
        password: "password",
      };
      setShowMenu(false);
      dispatch(login(user.email, user.password));
    };


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
        <div className= 'flex items-center justify-between'>

            <div className= 'home_page_icon'>
                <img src={globalIcon}/>
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
            <div className=''>
            <OpenModalButton
              buttonText="Join"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
            
            </div>
            <div>
            <button onClick={demo}>Log in as Demo</button>
            </div>
            

              
            </div>
        </div>


        <div className='homepage_title flex items-center justify-center h-screen'>
            <h1 className='title font-bold text-center text-6xl'>Welcome to Teach-Me!</h1>
            <h3 className='sub_title text-center text-2xl '>Become a tutor to post your own services!</h3>
            <button className='become_a_tutor text-center top-1' onClick={()=>history.push('/tutorsignup')} ><span>Become A TUTOR</span> </button>
        </div>

            


        </div>

    )

}

export default HomePage