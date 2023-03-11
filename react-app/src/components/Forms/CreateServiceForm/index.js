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
            history.push('/services')
        }
       
    }

    const updateImage = (e) =>{
        const file = e.target.files[0]
        setImage(file)
    }


    return (
        <div className=''>

        <div className='create_service_info flex items-center justify-center h-screen' >
        <div className='errors'>
        {errors && (
            <div>
            {errors}
            </div>
        )}
        </div>
        <form onSubmit={handleSubmit} >


        <div className='title_container p-4'>
        
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



        <div className='image_container p-4'>
        <label>Image </label>
        <div>
       
        <input
        type = 'file'
        required
        accept='image/*'
        name="image"
        onChange={updateImage}
        />
        </div>

        </div>
        
        <div className='subject_container p-4'>
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

        <div className='description_container p-4'>
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

        <div className='subject_lvl_container p-4' >
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

        <div className='price_container p-4'>
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
    
        
        
        <button type="submit" className='btn bg-black'><span>Submit</span></button>
        </form>
        

            </div>
        </div>

    )
}

export default CreateServiceForm