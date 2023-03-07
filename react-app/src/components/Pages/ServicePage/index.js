import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory, useParams } from "react-router-dom";
import { deleteService, getAllServices } from "../../../store/service";
import EditServiceForm from "../../Forms/EditServiceForm";
import './ServicePage.css'
import heart from '../../../icons/favorite.png'
import { getAllTutors } from "../../../store/tutor";

function ServicePage(){

    const services = useSelector(state => Object.values(state.service))
    const users = useSelector(state => Object.values(state.otherUsers))
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllServices())
        dispatch(getAllTutors())
    },[dispatch])


    return (

        <div className ='service_page_container'>
        {services.map((service)=>{
            return (
                <Link key={service.id} to={`/services/${service.id}`} className="service_container">
                    <div className="service_detail"> 

                        <div id='details'>

                            <div className='service_image'>
                                <img src={service.image}/>
                            
                            </div>

                        
                            <div id='subject_info'>
                                <div>
                                Subject: {service.subject}
                                </div>
                                <div>
                                Subject Level: {service.subject_level}
                                </div>
                            </div>
                           
                             
                        </div>

                        <div className='tutor_info'>
                        {users.map(user=>{
                            if(service.tutor === user.id){
                                return(
                                    <div id='details'> 
                                        <div id='prof_image'>
                                        <img src={user.profileImg}/> 
                                        </div>  
                                        <div id='username'>
                                        {user.username}
                                        </div>
                                    </div>
                                )
                            }
                        })}
                        
                        </div>
                        <div id='title'>
                            {service.title}
                        </div>


                        <div className='favorite_price'>
                                <div>
                                <img src={heart}/>
                                </div>

                                <div>
                                    <h5>My rate is ${service.price}/hr</h5>
                                </div>
                        
                        </div>


                    </div>
                
                </Link>
            )
        })}
        </div>
    )


}

export default ServicePage