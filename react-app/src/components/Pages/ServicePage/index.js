import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { deleteService, getAllServices } from "../../../store/service";
import EditServiceForm from "../../Forms/EditServiceForm";
import './ServicePage.css'
import heart from '../../../icons/favorite.png'

function ServicePage(){

    const services = useSelector(state => Object.values(state.service))
    const dispatch = useDispatch()
    const history = useHistory()
    const {serviceId} = useParams()


    useEffect(()=>{
        dispatch(getAllServices())
    },[dispatch])

    

    useEffect(()=>{
        dispatch(deleteService())
    })


    return (
        <div className ='service_page_container'>
        {services.map((service)=>{
            return (
                <div className="service_container">
                    <div className="service_detail"> 
                        <div>
                        
                        <h1>{service.title}</h1>
                        {service.subject}
                        {service.description}
                        </div>

                        <div>{service.tutor}</div>


                        <div>
                            <img src={heart}/>
                            
                            <h5>My rate is ${service.price}/hr</h5>
                        
                        </div>


                    </div>

                    <div>
                    <button onClick={()=>history.push(`/services/${service.id}`)}>View</button>              
                    </div> 

                
                </div>
            )
        })}
        </div>
    )


}

export default ServicePage