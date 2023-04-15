import React, { useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { editProfile } from '../../../store/session'

function EditProfile({userId, closeModal}){
    const currentUser = useSelector(state=>state.session.user)
    const [firstName, setFirstName] = useState(currentUser.firstName)
    const [lastName, setLastName] = useState(currentUser.lastName)
    const [description, setDescription] = useState(currentUser.description)
    const [profileImg, setProfileImg] = useState('')
    const [errors, setErrors] = ([])
    const dispatch = useDispatch()



    const handleSubmit = async(e) =>{
        e.preventDefault()

        const data = new FormData()
        data.append('firstName', firstName)
        data.append('lastName',lastName)
        data.append('description',description)
        data.append('profileImg',profileImg)
        
    
        const res = await dispatch(editProfile(userId, data))

        if(res.errors){
            setErrors(res.errors)
        }else{
            closeModal()
        }
      }
    
    
    const updateImage = (e) =>{
        const file = e.target.files[0]
        setProfileImg(file)
    }

    return (
        <div className='flex flex-col w-[40rem] h-[20rem]' >
        <form onSubmit={handleSubmit} className='flex flex-col items-center'>
        
        <lable className='text-xl'>Full Name</lable>

        <div>
          <lable> First Name </lable>
        <input
        className='border'
        type ='text'
        placeholder='First Name'
        value ={firstName}
        onChange ={(e)=> setFirstName(e.target.value)}
        />
        <lable> Last Name </lable>
        <input
        className='border'
        type='text'
        placeholder='Last Name'
        value ={lastName}
        onChange={(e) =>setLastName(e.target.value)}
        />
       </div>
        <label className='text-xl'>Description</label>
        <input
        className='w-[30rem] border h-[10rem] '
        placeholder='Write something about yourself'
        type='text'
        value ={description}
        onChange={(e) =>setDescription(e.target.value)}
        />
        <label className='text-xl'>Image</label>
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