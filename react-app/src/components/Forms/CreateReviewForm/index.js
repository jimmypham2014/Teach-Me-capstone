import React, {useState} from "react";
import {useDispatch} from "react-redux"
import { Redirect, useHistory } from "react-router-dom";
import { addReviews } from "../../../store/review";


function CreateReviewForm({serviceId}){
    const dispatch = useDispatch()
    const [comments, setComments] = useState("")
    const [reviewImage, setReviewImage] =useState("")
    const [rating, setRating] = useState(0)
    const [errors, setErrors] = useState([])
    const history = useHistory()


    const handleSubmit = async (e)=>{
        e.preventDefault()

        const payload= {
            comments,
            reviewImage,
            rating
        }
        const data = await dispatch(addReviews(serviceId, payload))
        
     
        if(data.errors){
            setErrors(data.errors)
        }
       
    }

    const updateImage = (e) =>{
        const file = e.target.files[0]
        setReviewImage(file)
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
        
        <label>Comments</label>
        <div>
       
        <input
        type = 'text'
        required
        value={comments}
        required
        onChange={(e) =>setComments(e.target.value)}
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
        
        
    

        <div className='price_container p-4'>
        <label>Rating </label>
        <div>
        <input
        type = 'number'
        required
        value={rating}
        required
        onChange={(e) =>setRating(e.target.value)}
        />
  
        </div>
        </div>
    
        
        
        <button type="submit" className='btn bg-black'><span>Submit</span></button>
        </form>
        

            </div>
        </div>

    )
}

export default CreateReviewForm