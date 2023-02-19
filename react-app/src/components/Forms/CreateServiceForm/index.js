import React, {useState} from "react";
import {useDispatch} from "react-redux"
import { addService } from "../../../store/service";

function CreateServiceForm(){
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [subject,setSubject] = useState("")
    const [description, setDescription] = useState("")
    const [subjectLevel, setSubjectLevel] = useState("")


    const handleSubmit = async (e)=>{
        e.preventDefault()

        const payload= {
            title,
            subject,
            description,
            subjectLevel
        }
        console.log(payload)
        await dispatch(addService(payload))
        
    }


    return (
        <div>
        <form onSubmit={handleSubmit}>
        <label>Title
        <input
        type = 'text'
        value={title}
        required
        onChange={(e) =>setTitle(e.target.value)}
        />
        </label>
        <label>Subject
        <input
        type = 'text'
        value={subject}
        required
        onChange={(e) =>setSubject(e.target.value)}
        />
        </label>
        <label>description
        <input
        type = 'text'
        value={description}
        required
        onChange={(e) =>setDescription(e.target.value)}
        />
        </label>
        <label>Subject Level
        <input
        type = 'text'
        value={subjectLevel}
        required
        onChange={(e) =>setSubjectLevel(e.target.value)}
        />
        </label>
    
        
        
        <button type="submit">Submit</button>
        </form>
        
        </div>

    )
}

export default CreateServiceForm