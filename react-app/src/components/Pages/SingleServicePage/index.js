import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { getSingleService,deleteService } from "../../../store/service";
import EditServiceForm from "../../Forms/EditServiceForm";

function ServiceDetailPage(){
    const dispatch = useDispatch()
    const {serviceId} = useParams()
    console.log(serviceId)
    const service = useSelector(state=> state.service[serviceId])
    console.log(service)
    const history = useHistory()
    const [open, setOpen] = useState(false)



    useEffect(()=>{
        dispatch(getSingleService(serviceId))

    },[dispatch])

    const removeService = ()=>{
        dispatch(deleteService(serviceId))
       history.push('/')
    }


    return(
        <div>
        {service&&(
            <div>
            {service.title}
            {service.subject}


            
            </div>

        )}
        <button onClick={()=>setOpen(true)}>Edit</button>
        <button onClick={removeService}>Delete</button>

        </div>
    )
}

export default ServiceDetailPage