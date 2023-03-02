const LOAD_BOOKING = 'bookings/LOAD_BOOKING'
const ADD_BOOKING = 'bookings/ADD_BOOKING'
const DELETE_BOOKING = 'bookings/DELETE_BOOKING'


const loadBookings = (bookings)=>({
    type: LOAD_BOOKING,
    payload: bookings

})


const addBooking = (booking) =>({
    type:ADD_BOOKING,
    payload: booking
})

const removeBooking = (bookingId)=>({
    type: DELETE_BOOKING,
    bookingId
})

export const getAllBookings = () => async(dispatch)=>{
    const res = await fetch('/api/bookings')
    console.log(res)
    if(res.ok){
        const bookings = await res.json();
        
        dispatch(loadBookings(bookings))
    }
        
}


export const add_booking =(serviceId,booking) => async(dispatch)=>{
    console.log(booking,'hello')
    console.log(serviceId)
    const res = await fetch(`/api/services/${serviceId}/bookings/`,{
        method: 'POST',
        headers:{
            "Content-Type": "application/json",
        },
        body:JSON.stringify(booking),
    })
    if(res.ok){
        const data = await res.json()
        console.log(data,'HELLOLOLOLOLOLOL')
        dispatch(addBooking(data))
        return data
    }
    else{
       const errors = await res.json()

       return errors
    }

}

export const remove_booking =(bookingId) => async(dispatch) =>{
    const res = await fetch(`/api/bookings/${bookingId}`,{
        method: 'DELETE',
        headers:{
            "Content-Type": "application/json"
        }
    })
    if(res.ok){
        dispatch(removeBooking(bookingId))
    }

}

export const edit_booking =(bookingId,booking) => async(dispatch) =>{
    console.log(booking, 'hello')
    const res = await fetch(`/api/bookings/${bookingId}`,{
        method: 'PUT',
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(booking)
    })
    if(res.ok){
        const bookingData = await res.json()
        console.log(bookingData,'thunk')
        dispatch(addBooking(bookingData))
        return bookingData
    }

}



const defaultState ={}


const bookingReducer = (state = defaultState, action)=>{
    let newState = {...state}
    switch(action.type){
        case ADD_BOOKING:
            newState[action.payload.id] = action.payload
            return newState

        case LOAD_BOOKING:
            action.payload.forEach(booking=>{
                newState[booking.id] = booking
            })
            return newState

        case DELETE_BOOKING:
            delete newState[action.bookingId]
            return newState

    
        default:
        return state
    }

}

export default bookingReducer