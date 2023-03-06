import React, {useState} from "react";
import {useDispatch} from "react-redux"
import { addService } from "../../../store/service";
import './CreateServiceForm.css'

function CreateServiceForm(){
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [subject,setSubject] = useState("")
    const [description, setDescription] = useState("")
    const [subject_level, setSubjectLevel] = useState("")
    const [image, setImage] =useState("")
    const [price, setPrice] = useState("")


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
        await dispatch(addService(payload))
        
    }


    return (
        <div>
        <form onSubmit={handleSubmit}>
        <label>Title
        <input
        type = 'text'
        required
        value={title}
        required
        onChange={(e) =>setTitle(e.target.value)}
        />
        </label>
        <label>Image
        <input
        type = 'text'
        required
        value={image}
        required
        onChange={(e) =>setImage(e.target.value)}
        />
        </label>
        <label>Subject
        <input
        type = 'text'
        required
        value={subject}
        required
        onChange={(e) =>setSubject(e.target.value)}
        />
        </label>
        <label>description
        <input
        type = 'text'
        required
        value={description}
        required
        onChange={(e) =>setDescription(e.target.value)}
        />
        </label>
        <label>Subject Level
        <input
        type = 'text'
        required
        value={subject_level}
        required
        onChange={(e) =>setSubjectLevel(e.target.value)}
        />
        </label>

        <label>Price
        <input
        type = 'number'
        required
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

export default CreateServiceForm