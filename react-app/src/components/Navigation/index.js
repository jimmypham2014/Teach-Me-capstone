import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../icons/Black logo - no background.png'
import favorite from '../../icons/favorite.png'
import message from '../../icons/messages.png'

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

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
					Messages
					
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