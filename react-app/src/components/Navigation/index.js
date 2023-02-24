import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../icons/fiverr.png'
import favorite from '../../icons/favorite.png'
import message from '../../icons/messages.png'

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='nav_container'>

				<div className = 'icon'>
			
				<NavLink exact to="/" className='logo'><img src={logo}/></NavLink>
				</div>

				<div className='search_middle'>
				 <input
				 type="text"
				 placeholder ='What do you need help today?'
				 />
				
				</div>
			
			{isLoaded && (

				<div className ='right_side_container'>
					<div>
					<img src={message}/>
					</div>
					<div>
					<img src={favorite}/>
					</div>

					<NavLink to='/bookings'>
					Bookings
					
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