import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory, useParams } from "react-router-dom";
import { getSingleService,deleteService, getAllServices } from "../../../store/service";
import CreateBookingForm from "../../Forms/CreateBookingForm";
import EditServiceForm from "../../Forms/EditServiceForm";
import './SingleServicePage.css'

function ServiceDetailPage(){
    const dispatch = useDispatch()
    const {serviceId} = useParams()
    const service = useSelector(state => state.service[serviceId])
    const sessionUser = useSelector(state=>state.session)
    const history = useHistory()
    const tutors = useSelector(state=> Object.values(state.tutors))
    const users = useSelector(state => Object.values(state.otherUsers))






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
        <div className='single_service_container'>

            <div className='main'>
                {service&&(
                    <div id='service_details'>
                        <div>
                            <h1>{service.title}</h1>
                        </div>
                         <div>
                            {service.subject}
                        </div>

                        <div className='tutor_container'>
                            {specificUser.map(user=>{
                                return(
                                    <div className ='tutor_info'>
                                        <div id='image'> <img src={user.profileImg}/></div>
                                        <div id='username'>{user.username}</div>
                                       
                                    </div>
                                )
                            })}
                        
                        </div>

                        <div className='single_service_image'>
                            <img src={service.image}/>
                        </div>
            
                     </div>
                 )}
        
                    {sessionUser && service.tutor && service.tutor === sessionUser.user.id ? 
                    <div>
                        <button onClick={editService}>Edit</button>
                        <button onClick={removeService}>Delete</button> 
                    </div>: null}


                    <div>
                    <h4>About this service</h4>
                       <p>{service.description}</p> 
                    </div>


                  <div>
                  <h4>About The Tutor</h4>
                        <div>
                    {specificUser.map(user=>{
                        return(
                           <div className='about_me_container'>
                                <div id='about_me_image'>
                                    <img src={user.profileImg}/>
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
                        <h5> About me</h5>
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
                            <div>
                            College: {tutor.education}

                            </div>
                            <div>
                            Credentials: {tutor.credentials}
                            </div>
                              
                            </div>
                       
                           )
                       })}
                    
                    </div>
                  
                  </div>
                
           

             </div>

             <div className='create_booking_form'>
                <CreateBookingForm serviceId ={service.id}/>
             </div>

        </div>
    )
}

export default ServiceDetailPage