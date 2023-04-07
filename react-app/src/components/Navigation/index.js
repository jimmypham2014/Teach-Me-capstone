import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../icons/Black logo - no background.png'
import notiIcon from '../../icons/icons8-exclamation-mark-48.png'

import {AiOutlineMail} from 'react-icons/ai'

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

    const allMessages = useSelector(state=>Object.values(state.messages))

	const messages = allMessages.filter(message=> message.recipient_id === sessionUser.id)
	
	

	return (
		<div className='flex items-center justify-between'>

				<div className = 'icon'>
			
				<NavLink exact to="/" className='logo'><img src={logo}/></NavLink>
				</div>

			
			
			{isLoaded && (

				<div className ='right_side_container'>
				

					<NavLink to='/bookings'>
					Bookings
					
					</NavLink>

					<NavLink to='/about'>
					About
					</NavLink>

					<NavLink to ='/messages'>

					<AiOutlineMail size={30}/>
		
					</NavLink>


					<div>
					<ProfileButton user={sessionUser} />

					</div>


				</div>
				
			)}


			</div>
	);
}

export default Navigation;