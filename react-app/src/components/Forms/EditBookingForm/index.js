import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux"
import { useParams } from "react-router-dom";
import { add_booking, edit_booking } from "../../../store/booking";


function EditBookingForm(){
    const dispatch = useDispatch()
    const {bookingId} = useParams()
    const allBookings = useSelector(state=> state.booking)
    const specificBooking = allBookings[bookingId]
    const [date, setDate] = useState(specificBooking.booking_date)
    const [time_from, setTimeFrom] = useState(specificBooking.booking_time_from)
    const [time_to, setTimeTo] = useState(specificBooking.booking_time_to)
   
    const handleSubmit =(e)=>{
        e.preventDefault()
        const payload ={
            date,
            time_from,
            time_to
        }
        console.log(payload)
        dispatch(edit_booking(bookingId,payload))
    }

    return(
        <div>
        <form onSubmit={handleSubmit}>
        <label>Date:</label>
        <input
        type = 'date'
        value={date}
        onChange={(e)=>setDate(e.target.value)}
    
        />

        <label>Time:</label>
        <input
        type = 'time'
        value={time_from}
        onChange={(e)=>setTimeFrom(e.target.value)}
        />


        <label>Time:</label>
        <input
        type = 'time'
        value={time_to}
        onChange={(e)=>setTimeTo(e.target.value)}
        />
        
        
        <button type='submit'>Submit</button>
        </form>
        </div>
    )
}

export default EditBookingForm