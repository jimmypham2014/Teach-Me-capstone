const LOAD_REVIEW = 'services/LOAD_REVIEW'
const ADD_REVIEW= 'services/ADD_REVIEW'
const DELETE_REVIEW = 'services/DELETE_REVIEW'



const loadReviews = (reviews)=>({
    type: LOAD_REVIEW,
    payload: reviews

})

const add_review = (review) =>({
    type:ADD_REVIEW,
    payload: review
})

const remove_review = (review) =>({
    type: DELETE_REVIEW,
    payload: review
})

export const getAllReviews = () => async (dispatch)=>{
    const res = await fetch("/api/reviews");

    if(res.ok){
        const reviews = await res.json();
        dispatch(loadReviews(reviews))
    }

}

export const deleteReview = (reviewId)=> async(dispatch) =>{
    const res = await fetch(`/api/reviews/${reviewId}`,{
    method:"DELETE",
    headers:{
        "Content-Type": "application/json"
    }
    })
    if(res.ok){
        dispatch(remove_review(reviewId))
    }
}


export const addReviews = (serviceId, service) => async(dispatch)=>{

    const {comments, rating, reviewImage} =  service
    const formData = new FormData()
    formData.append('comments', comments)
    formData.append('rating',rating)
   

    if(reviewImage) formData.append("reviewImage", reviewImage)


    const res = await fetch(`/api/services/${serviceId}`,{
        method: "POST",
        body: formData,
        
    })

    if(res.ok){
        const newData = await res.json();
        dispatch(add_review(newData))
        return newData
    } else{
        const error = await res.json()
        return error
    }


}


const defaultState = {}

const reviewReducer = (state= defaultState,action) =>{
    let newState = {...state}
    switch(action.type){
        case LOAD_REVIEW:
            action.payload.forEach(review=>{
                newState[review.id] = review
            })
           
            return newState
        

        case ADD_REVIEW:
            newState[action.payload.id ]= action.payload
            return newState
        
        case DELETE_REVIEW:
            delete newState[action.reviewId]
            return newState
            
     
        default:
        return state;
}   
}
export default reviewReducer
