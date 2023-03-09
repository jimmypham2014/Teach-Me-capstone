import React, {useState} from "react";
import {useDispatch} from "react-redux"
import { Redirect, useHistory } from "react-router-dom";
import { addService } from "../../../store/service";
import './CreateServiceForm.css'

function CreateServiceForm(){
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [subject,setSubject] = useState("")
    const [description, setDescription] = useState("")
    const [subject_level, setSubjectLevel] = useState("")
    const [image, setImage] =useState("")
    const [errors, setErrors] = useState("")
    const [price, setPrice] = useState("")
    const history = useHistory()


    const handleSubmit = async (e)=>{
        e.preventDefault()

        const payload= {
            title,
            subject,
            image,
            description,
            subject_level,
            price
        }
        const data = await dispatch(addService(payload))
        
     
        if(data.errors){
            setErrors(data.errors)
        }else{
            history.push('/')
        }
       
        
        
    }


    return (
        <div className='flex justify-center items-center'>

        <div className='create_service_info flex justify-center top-11' >
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

export default CreateServiceForm