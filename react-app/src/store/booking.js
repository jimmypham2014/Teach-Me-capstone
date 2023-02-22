const LOAD_BOOKING = 'bookings/LOAD_BOOKING'
const ADD_BOOKING = 'bookings/ADD_BOOKING'


const loadBookings = (bookings)=>({
    type: LOAD_BOOKING,
    payload: bookings

})


const addBooking = (booking) =>({
    type:ADD_BOOKING,
    payload: booking
})

export const getAllBookings = () => async(dispatch)=>{
    const res = await fetch('/api/bookings')
    console.log(res)
    if(res.ok){
        const bookings = await res.json();
        
        dispatch(loadBookings(bookings))
    }
        
}


export const add_booking =(booking) => async(dispatch)=>{
    console.log(booking)
    const res = await fetch('/api/bookings/',{
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

    
        default:
        return state
    }

}

export default bookingReducer