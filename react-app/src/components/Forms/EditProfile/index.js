import React, { useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { editProfile } from '../../../store/session'

function EditProfile(){
    const currentUser = useSelector(state=>state.session.user)
    const [firstName, setFirstName] = useState(currentUser.firstName)
    const [lastName, setLastName] = useState(currentUser.lastName)
    const [description, setDescription] = useState(currentUser.description)
    const [profileImg, setProfileImg] = useState('')
    const [errors, setErrors] = ([])
    const dispatch = useDispatch()


console.log(firstName)

    const handleSubmit = async(e) =>{
        e.preventDefault()

        const data = new FormData()
        data.append('firstName', firstName)
        data.append('lastName',lastName)
        data.append('description',description)
        data.append('profileImg',profileImg)

        console.log(data)

        const res = await dispatch(editProfile(currentUser.id, data))

        if(res.errors){
            setErrors(res.errors)
        }

    } 
    const updateImage = (e) =>{
        const file = e.target.files[0]
        setProfileImg(file)
    }

    return (
        <div>
        <form onSubmit={handleSubmit}>
        <lable>Full Name</lable>

        <input
        type ='text'
        value ={firstName}
        onChange ={(e)=> setFirstName(e.target.value)}
        />

        <input
        type='text'
        value ={lastName}
        onChange={(e) =>setLastName(e.target.value)}
        />

        <label>Description</label>
        <input
        type='text'
        value ={description}
        onChange={(e) =>setDescription(e.target.value)}
        />
        <label>Image</label>
        <input
        type = 'file'
        accept='image/*'
        name="image"
        onChange ={updateImage }
        />
        
        
        <button type='submit'>Submit</button>
        </form>

    
        </div>
        
    )
}

export default EditProfile