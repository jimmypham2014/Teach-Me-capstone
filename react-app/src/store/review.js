const LOAD_REVIEW = 'services/LOAD_SERVICE'
const ADD_REVIEW= 'services/ADD_SERVICE'
const DELETE_SERVICE = 'services/DELETE_SERVICE'



const loadReviews = (reviews)=>({
    type: LOAD_REVIEW,
    payload: reviews

})

const add_reivew = (review) =>({
    type:ADD_REVIEW,
    payload: review
})


export const addReviews = (serviceId, service) => async(dispatch)=>{

    const {comments, rating, reviewImage} =  service
    const formData = new FormData()
    formData.append('comments', comments)
    formData.append('rating',rating)
    }

    if(reviewImage) formData.append("reviewImage", reviewImage)


    const res = await fetch(`/api/services/${serviceId}`,{
        method: "POST",
        body: formData,
        
    })
