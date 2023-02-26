import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory, useParams } from "react-router-dom";
import { getSingleService,deleteService, getAllServices } from "../../../store/service";
import CreateBookingForm from "../../Forms/CreateBookingForm";
import EditServiceForm from "../../Forms/EditServiceForm";

function ServiceDetailPage(){
    const dispatch = useDispatch()
    const {serviceId} = useParams()
    const service = useSelector(state => state.service[serviceId])
    const sessionUser = useSelector(state=>state.session)
    const history = useHistory()
    const [open, setOpen] = useState(false)


   console.log(service)

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


    return(
        <div>
        {service&&(
            <div>
        
            {service.title}
            {service.subject}
            
            </div>

        )}
        
        {sessionUser && service.tutor && service.tutor === sessionUser.user.username ? 
            <div>
            <button onClick={editService}>Edit</button>
             <button onClick={removeService}>Delete</button> 
            </div>: null}


            <div>
            <CreateBookingForm serviceId ={service.id}/>
            </div>

        </div>
    )
}

export default ServiceDetailPage