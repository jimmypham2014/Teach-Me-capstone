import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux"
import { useHistory, useParams } from "react-router-dom";
import {  editService } from "../../../store/service";

function EditServiceForm(){
    const {serviceId} = useParams()
    const allServices = useSelector(state =>state.service)
    const specificService = allServices[serviceId]
    const dispatch = useDispatch()
    const history = useHistory()

    const [title, setTitle] = useState(specificService.title)
    const [subject, setSubject] = useState(specificService.subject)
    const [description, setDescription] = useState(specificService.description)
    const [subject_level, setSubject_Level] = useState(specificService.subject_level)
    const [image, setImage] = useState(specificService.image)
    const [price, setPrice] = useState(specificService.price)

   if(!specificService) return null

  

    const handleSubmit=(e)=>{

        e.preventDefault()

        const payload={
            title,
            subject,
            description,
            price,
            image,
            subject_level
            
        }
        console.log(payload,'edit form')
        dispatch(editService(serviceId,payload))
        history.push(`/services/${serviceId}`)

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
            Image
             <input
             type ='text'
             value={image}
             onChange={(e)=>setImage(e.target.value)}
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

            <label>Subject Level
            <input
            type = 'text'
            value={subject_level}
            required
            onChange={(e) =>setSubject_Level(e.target.value)}
            />
            </label>
    
            <label>Price
            <input
            type = 'number'
            value={price}
            required
            onChange={(e) =>setPrice(e.target.value)}
            />
            </label>
    
        
        <button type="submit">Submit</button>
        </form>

        </div>

    )
}

export default EditServiceForm