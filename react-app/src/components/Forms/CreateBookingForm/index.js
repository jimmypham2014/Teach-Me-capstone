import React, {useState} from "react";
import {useDispatch} from "react-redux"
import { add_booking } from "../../../store/booking";


function CreateBookingForm(){
    const dispatch = useDispatch()
    const [date, setDate] = useState('')
    const [timeFrom, setTimeFrom] = useState('')
    const [timeTo, setTimeTo] = useState('')

    const handleSubmit =(e)=>{
        e.preventDefault()
        const payload ={
            date,
            timeFrom,
            timeTo
        }
        console.log(payload)
        dispatch(add_booking(payload))
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
        value={timeFrom}
        onChange={(e)=>setTimeFrom(e.target.value)}
        />


        <label>Time:</label>
        <input
        type = 'time'
        value={timeTo}
        onChange={(e)=>setTimeTo(e.target.value)}
        />
        
        <button type='submit'>Submit</button>
        </form>
        
        </div>
    )
}

export default CreateBookingForm