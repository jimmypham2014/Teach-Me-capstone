import { Button, Rate, Upload } from 'antd';
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addReviews } from "../../../store/review";


function CreateReviewForm({serviceId, handleClick}){
    const dispatch = useDispatch()
    const [comments, setComments] = useState("")
    const [reviewImage, setReviewImage] =useState("")
    const [rating, setRating] = useState(0)
    const [errors, setErrors] = useState([])
    const currentUser = useSelector(state =>state.session.user)
    const allReviews = useSelector(state=> Object.values(state.reviews))
    


    const specificReviews = allReviews.filter(review => review.service_id === serviceId)


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

        setComments('')
        setReviewImage('')
        setRating(0)
       
    }

    const updateImage = (file) =>{
    
        setReviewImage(file.file.originFileObj)
    }


    return (
        <div className='flex flex-row'>

        <div  className='flex flex-col'>
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
        className='w-[400px] h-[100px] border '
        type = 'text'
        required
        value={comments}
        placeholder='Leave a review'
        required
        onChange={(e) =>setComments(e.target.value)}
        />
        </div>

        </div>



        <div className='image_container p-4'>
    
        <Upload
        listType='picture'
        accept=".png, .jpeg,.doc"
        onChange={updateImage}
        onRemove={(e)=> console.log(e)}
        >
        <Button>Upload</Button></Upload>
        </div>
        
    

        <div className='price_container p-4'>
        <label>Rating </label>
       
        <Rate 
        onChange={(e)=> setRating(e)}
        tooltips={["Terrible","Bad", "Normal", "Good", "Excellent"]}
        />
        
        </div>

        <button type="submit" className='btn bg-black'><span>Submit</span></button> 
        
                    
        </form>
        

            </div>

            
        </div>

    )
}

export default CreateReviewForm