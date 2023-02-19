import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux"
import { useHistory, useParams } from "react-router-dom";
import { addService, getAllServices } from "../../../store/service";

function EditServiceForm(){
    const {serviceId} = useParams()
    const allServices = useSelector(state =>state.service)
    const specificService = allServices[serviceId]
    const dispatch = useDispatch()
    const history = useHistory()
    console.log(specificService)
    const [title, setTitle] = useState(specificService.title)
    const [subject, setSubject] = useState(specificService.subject)
    const [ description, setDescription] = useState(specificService.description)

   console.log(serviceId)
   if(!specificService) return null

  

    const handleSubmit=(e)=>{

        e.preventDefault()
        const payload={
            title,
            subject,
            description
        }
        dispatch(addService(payload))
        history.push('/')

    }




    return (
        <div>
        <form onSubmit={handleSubmit}>
            <label>
            Title
             <input
             type ='text'
             value={title}
             onChange={(e)=>setTitle(e.target.value)}


             />
            
            </label>
            <label>
            Subject
             <input
             type ='text'
             value={subject}
             onChange={(e)=>setSubject(e.target.value)}


             />
            
            </label>
            <label>
            Description
             <input
             type ='text'
             value={description}
             onChange={(e)=>setDescription(e.target.value)}


             />
            
            </label>
    
        
        <button type="submit">Submit</button>
        </form>

        </div>

    )
}

export default EditServiceForm