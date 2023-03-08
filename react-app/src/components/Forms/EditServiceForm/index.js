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
    const [subject_level, setSubjectLevel] = useState(specificService.subject_level)
    const [image, setImage] = useState(specificService.image)
    const [price, setPrice] = useState(specificService.price)
    const [errors, setErrors] =useState('')

   if(!specificService) return null

  

    const handleSubmit= async (e)=>{

        e.preventDefault()

        const payload={
            title,
            subject,
            description,
            price,
            image,
            subject_level
            
        }
        
       const data = await dispatch(editService(serviceId,payload))
        
       if(data.errors){
        setErrors(data.errors)
    }   else{
        history.push('/')
    }

    }




    return (
        <div className='create_service_container'>

        <div className='create_service_info'>
        <div className='errors'>
        {errors && (
            <div>
            {errors}
            </div>
        )}
        </div>
        <form onSubmit={handleSubmit}>


        <div className='title_container'>
        
        <label>Title</label>
        <div>
       
        <input
        type = 'text'
        required
        value={title}
        required
        onChange={(e) =>setTitle(e.target.value)}
        />
        </div>

        </div>



        <div className='image_container'>
        <label>Image </label>
        <div>
       
        <input
        type = 'text'
        required
        value={image}
        required
        onChange={(e) =>setImage(e.target.value)}
        />
        </div>

        </div>
        
        <div className='subject_container'>
        <label>What subject are you tutoring?</label>

        <div>
        <input
        type = 'text'
        required
        value={subject}
        required
        onChange={(e) =>setSubject(e.target.value)}
        />
        </div>
        
        </div>

        <div className='description_container'>
        <label>Provide a description of your service </label>
        <div>
       
        <input
        type = 'text'
        required
        value={description}
        required
        onChange={(e) =>setDescription(e.target.value)}
        />
        </div>
        </div>

        <div className='subject_lvl_container'>
        <label>What is the subject grade level? </label>
        <div>
        <input
        type = 'text'
        required
        value={subject_level}
        required
        onChange={(e) =>setSubjectLevel(e.target.value)}
        />
        </div>
        
        </div>

        <div className='price_container'>
        <label>How much would you like to charge per hour? </label>
        <div>
        <input
        type = 'number'
        required
        value={price}
        required
        onChange={(e) =>setPrice(e.target.value)}
        />
        /hr
        </div>
        </div>
    
        
        
        <button type="submit" className='btn'><span>Submit</span></button>
        </form>
        

            </div>
        </div>

    )
}

export default EditServiceForm