import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink ,Link} from 'react-router-dom'
import EditProfile from '../../Forms/EditProfile'
import OpenModalButton from '../../OpenModalButton'
import './ProfilePage.css'
import {BiEditAlt} from 'react-icons/bi'

function ProfilePage(){
    const currentUser = useSelector(state => state.session.user)
    const services = useSelector(state => Object.values(state.service))
    const [showMenu, setShowMenu] = useState(false);
    
    const closeMenu = () => setShowMenu(!showMenu);


    return(
    <>
    
        <div className='flex flex-col items-center justify-center'>
            {currentUser && (

                <div className='profile_container  border  m-7 flex flex-col items-center justify-center w-[500px]'>
                    <img className='rounded-full m-5 w-1/2' src={currentUser.profileImg}/>
                    
                    <div className='text-xl'>
                    {currentUser.firstName} {currentUser.lastName}
                
                    </div>
                    
                    <div className='text-l'>
                    {currentUser.description}
                    </div>

                   <div className='hover:bg-gray-200 rounded-full w-8'> 
                    <OpenModalButton
                        buttonText={<BiEditAlt size={30}/>}
                        onItemClick={closeMenu}
                        modalComponent={<EditProfile userId={currentUser.id} />}
                    />

                    </div>





                    
                    
                   
                </div>

             
                
            )}

            
            

 
          <div className='text-2xl'>
             My Services
          </div>
        
        </div>
         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-5 gap-[54px] max-w-sm max-auto md:max-w-none md:mx-0'>
         {services.map(service=> service.tutor === currentUser.id &&(
             <Link key={service.id} to={`/services/${service.id}`} className=" w-[200px] h-[340px] pt-8">
                    <div className=" details border border-[#e4e4e] mb-4 relative overflow-hidden group tranistion hover:scal-125 rounded-t-lg "> 

                        <div  className='w-full h-full  flex justify-center items-center'>

                            <div className=' mx-auto flex justify-center items-center'>
                            
                                <img className='max-h-[160x] h-[140px] group-hover:scale-110  transition duration-500 ease-in-out rounded-t-lg ' src={service.image}/>
                            </div>
                        
                        </div>

                        <div>
                            <h2 className='font-semibold mb-1 pt-2 pl-2'>Subject: {service.subject}</h2>
                            <h2 className='font-semibold mb-1 pl-2'>Subject-Level: {service.subject_level}</h2>
                        </div>

                        <div>
                        <h2 className='font-semibold mb-1 pl-2'>{service.title}</h2>
                        </div>

                        <div className='mb-1 pl-2'>
                            My rate is ${service.price}/hr
                        </div>

                    </div>
                
                </Link>
         ))}

         </div>


     </>
    )


}

export default ProfilePage