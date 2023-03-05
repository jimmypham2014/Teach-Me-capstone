import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './ProfileButton.css'
import { useHistory } from "react-router-dom";
import defaultProf from '../../icons/default_prof.png'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const currentUser = useSelector(state =>state.session)
  const ulRef = useRef();
  const history = useHistory()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
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

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  const hostAService = ()=>{
    history.push('/services')
  }

  return (
    <div className='prof'>
      <button onClick={openMenu} > 
       {currentUser.profileImg ? currentUser.profileImg  : <img src={defaultProf}/>}
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li><button onClick={()=>history.push(`/${user.username}`)}>{user.username}</button></li>
            <li>{user.email}</li>
            
            { user.is_student === false ?
              
              <li>
              <button onClick={hostAService}>Host a service</button>
              </li>
              
              :null} 
            
          
            <li>
              <button onClick={handleLogout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
      </div>
  );
}

export default ProfileButton;
