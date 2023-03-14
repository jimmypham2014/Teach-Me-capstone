import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux"
import { Redirect, useHistory } from "react-router-dom";
import { edit_booking } from "../../../store/booking";
import OpenModalButton from "../../OpenModalButton";
import './EditBookingForm.css'


function EditBookingForm({bookId, closeModal}){
    const dispatch = useDispatch()

    const allBookings = useSelector(state=> state.booking)
    const specificBooking = allBookings[bookId]
    const [date, setDate] = useState(new Date(specificBooking.booking_date).toLocaleDateString())
    const [time_from, setTimeFrom] = useState(specificBooking.booking_time_from.slice(0,5))
    const [time_to, setTimeTo] = useState(specificBooking.booking_time_to.slice(0,5))
    const [errors, setErrors] = useState('')

  
    
    
    const handleSubmit = async (e)=>{
        
        
        
    
        e.preventDefault()

        const payload ={
            date,
            time_from,
            time_to
        }
       

        const data = await dispatch(edit_booking(bookId,payload))

        if(data.errors){
            setErrors(data.errors)
        }
        else{
            closeModal()
            
        }
    }
   

    return(
        <>
        <div className='errors bg-red-50 '>
        {errors ? <div>{errors}</div>: null}
        </div>

       
        <div className='edit_booking_container w-80 flex justify-center items-center p-3 rounded-lg z-2'>
        <form onSubmit={handleSubmit}>

        
        <label>Date:</label>

        <div className=''>
        <input
        type = 'date'
        value={date}
        onChange={(e)=>setDate(e.target.value)}
        required
    
        />
        </div>

        <label>Time From:</label>
        <div>
        <input
        type = 'time'
        value={time_from}
        onChange={(e)=>setTimeFrom(e.target.value)}
        />

        </div>

        <label>Time To:</label>
        <div>
        <input
        type = 'time'
        value={time_to}
        onChange={(e)=>setTimeTo(e.target.value)}
        />
        </div>
        
        <button className='submit_edit_booking_btn bg-black' type='submit'><span>Submit</span></button>
        </form>
        </div>
        </>
    )
}

export default EditBookingForm