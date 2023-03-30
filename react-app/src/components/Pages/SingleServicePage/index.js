import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory, useParams } from "react-router-dom";
import { getSingleService,deleteService, getAllServices } from "../../../store/service";
import CreateBookingForm from "../../Forms/CreateBookingForm";
import './SingleServicePage.css'
import {TbCategory} from 'react-icons/tb'
import {FaUniversity} from 'react-icons/fa'
import {IoMdSchool} from 'react-icons/io'
import Chat from "../../Chat";
import {AiOutlineCloseCircle} from 'react-icons/ai'
import styled from '@emotion/styled'


export const StyleWrapper = styled.div`

.chat-container {
    width: 50rem;
   
    }
    
#scrollableDiv{
    height: 200px;
}

}
   
`

function ServiceDetailPage(){
    const dispatch = useDispatch()
    const {serviceId} = useParams()
    const service = useSelector(state => state.service[serviceId])
    const sessionUser = useSelector(state=>state.session)
    const history = useHistory()
    const tutors = useSelector(state=> Object.values(state.tutors))
    const users = useSelector(state => Object.values(state.otherUsers))
  
    const [loading, setLoading] = useState(true);
    const [buttonStatus, setButtonStatus] = useState(false);







 
    const handleClick = ()=>{
        if (buttonStatus ===false){
            setButtonStatus(true)
            setLoading(true);
        }else{
            setButtonStatus(false)
            
        }


    }

    useEffect(()=>{
        dispatch(getSingleService(serviceId))

    },[dispatch])



    const removeService = ()=>{
        dispatch(deleteService(serviceId))
       history.push('/')
    }

    if(!service){
        return null
    }

    const editService = ()=>{
        history.push(`/services/${serviceId}/editform`)
    
    }

    const specificTutor = tutors.filter(tutor => service.tutor === tutor.user_id)
    const specificUser = users.filter(user => user.id === service.tutor)

    


  



    return(

        <div className='2xl:flex 2xl:flex-row  xl:flex xl:flex-row justify-center items-center py-5 sm:flex-col md:flex-col'>

            <div className=''>
                {service&&(
                    <div id=''>
                        <div>
                            <h1 className='font-bold text-2xl'>{service.title}</h1>
                        </div>
                         <div className='flex items-center'>
                           <TbCategory/>
                           <div className='pl-2'>
                           {service.subject}
                           </div>
                           
                        </div>
                        <div className='border'></div>

                        <div className='flex'>
                            {specificUser.map(user=>{
                                return(
                                    <div className ='flex items-center justify-between'>
                                        <div className='w-9 p-1'> 
                                        {user.profileImg &&(
                                        <img src={user.profileImg}/>
                                        )}
                                        </div>
                                        <div id='username'>{user.username}</div>
                                       
                                    </div>
                                )
                            })}
                        
                        </div>

                        <div className='single_service_image w-full '>
                            <img src={service.image}/>
                        </div>
            
                     </div>
                 )}
        
                    {sessionUser && service.tutor && service.tutor === sessionUser.user.id ? 
                    <div className='modify_btn'>
                        <button  onClick={editService}>Edit</button>
                        <button  onClick={removeService}>Delete</button> 
                    </div>: null}


                    <div className='p-2'>
                    <h4 className='font-bold text-xl'>About this service</h4>
                       <p className='m-3'>{service.description}</p> 
                    </div>

                    <div className='border'></div>

                    

                  <div className='p-2'>
                  <h4 className='font-bold text-xl'>About The Tutor</h4>
                        <div>
                    {specificUser.map(user=>{
                        return(
                           <div className='flex items-center '>
                                <div className='w-[100px] p-2'>
                                    {user.profileImg &&(
                                    <img src={user.profileImg}/>
                                    )}
                                </div>

                                <div className ='about_me_details'>
                                    <div id='first_last'>{user.firstName}, {user.lastName}</div> 
                                    <div id='about_me_username'>{user.username}</div>
                                 </div>
                           
                           </div>

                        )
                    })}
                    </div>

                    <div>
                        <h5 className='font-bold'> About me</h5>
                        <div>
                        {specificUser.map(user=>{

                            return(
                                <div>
                                {user.description}
                                </div>
                            )
                        })}

                        </div>
                       {specificTutor.map(tutor=>{
                           return(

                            <div>
                            <div className='flex items-center'>
                            <FaUniversity/> 
                            <div className='pl-2'>
                            
                            {tutor.education}
                            </div>

                            </div>
                            <div className='flex items-center'>
                                <IoMdSchool/> 
                                <div className='pl-2'>
                                {tutor.credentials}
                                </div>
                            </div>
                              
                            </div>
                       
                           )
                       })}
                    
                    </div>
                  
                  </div>

                  {specificUser[0].id !== sessionUser.user.id && 
                     (!buttonStatus ? (
                         
                        
                         <button onClick={handleClick}>Contact Me</button>


                     ): (
                       
                         <div className='border carousel sticky bottom-0 z-2 bg-white right-5'>
                         <div className='flex justify-between border-solid border-b-2 border-black'>
                         <div className='flex items-center m-2'>
                         <img  className ='w-9 rounded-full p-1' src= {specificUser[0].profileImg}/> 

                         {specificUser[0].username}
                         </div>
                         
                        <button className='p-1 hover:bg-gray-100 hover:rounded-full flex justify-end ' onClick={handleClick}>
                        
                        <AiOutlineCloseCircle />
                        
                        </button> 
                        </div>
                        
                        <div className='h-[300px]'>
                        <StyleWrapper>
                        <Chat userId = {specificUser[0].id} username= {specificUser[0].username}/>
                        </StyleWrapper>
    
                        </div>
                        </div>

                      
                     )
                    )
                 
                    }
                  
             </div>

             <div className='ml-[100px] sm:flex sm:flex-col sm:items-center sm:w-[0px]   md:flex md:flex-col md:items-center md:w-[100px]  lg:flex lg:flex-col lg:items-center lg:w-[400px] '>
                <CreateBookingForm serviceId ={service.id}/>
             </div>

            

        </div>
        
    )
}

export default ServiceDetailPage