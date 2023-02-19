import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { deleteService, getAllServices } from "../../../store/service";
import EditServiceForm from "../../Forms/EditServiceForm";
import './ServicePage.css'

function ServicePage(){

    const services = useSelector(state => Object.values(state.service))
    const dispatch = useDispatch()
    const history = useHistory()
    const {serviceId} = useParams()
    console.log(services)

    useEffect(()=>{
        dispatch(getAllServices())
    },[dispatch])

    

    useEffect(()=>{
        dispatch(deleteService())
    })


    return (
        <div>
        {services.map((service)=>{
            return (
                <div className="service_container">
                    <div className="service_detail"> 
                    <h1>{service.title}</h1>
                    {service.subject}
                    {service.description}
                    </div>
                    <button onClick={()=>history.push(`/services/${service.id}`)}>View</button>
                    <button onClick={()=> dispatch(deleteService(service.id))}>Delete</button>                  

                
                </div>
            )
        })}
        </div>
    )


}

export default ServicePage