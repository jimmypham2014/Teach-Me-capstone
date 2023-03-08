import React, {useState} from "react";
import {useDispatch} from "react-redux"
import { useHistory } from "react-router-dom";
import { add_booking } from "../../../store/booking";
import {allTimes} from '../../utils/allTimes'
import './BookingForm.css'


function CreateBookingForm({serviceId}){

    const dispatch = useDispatch()
    const [date, setDate] = useState('')
    const [time_from, setTimeFrom] = useState('')
    const [time_to, setTimeTo] = useState('')
    const [service_id, setServiceId] = useState(serviceId)
    const [errors, setErrors] = useState([])
    const history =useHistory()
  

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const payload ={
            date,
            time_from,
            time_to,
            service_id
            
        }
    
        const data = await dispatch(add_booking(service_id,payload))
  

        if(data.errors){
            setErrors(data.errors)
        }else{
            history.push('/bookings')
        }

    }



    return(
        <div className='bookingForm_container'> 

        <div className='booking_form_title'>
            Book a session
        
        </div>

        <span></span>
        <div>
        <form onSubmit={handleSubmit}>
        
        {errors ?
            <div className='errors'>
            {errors}
            </div>
            :
            null
       }

        <div id='form_detail'>
        <label>Date:</label>
        <input
        type = 'date'
        required
        value={date}
        onChange={(e)=>setDate(e.target.value)}
        />
        </div>


       
        <div className='booking_time'>
            <div>
        <label>From: </label>
        <input
        type = 'time'
        required
        value={time_from}
        onChange={(e)=>setTimeFrom(e.target.value)}
        />
            </div>
        
            <div>

        <label>To: </label>
        <input
        type = 'time'
        required
        value={time_to}
        onChange={(e)=>setTimeTo(e.target.value)}
        />
            </div>

        </div>
  

        
            <div  className='booking_btn' id='form_detail'>
            <button className='cta' type='submit'>
            <span>Book Now!</span>
            <svg width="13px" height="10px" viewBox="0 0 13 10">
            <path d="M1,5 L11,5"></path>
            <polyline points="8 1 12 5 8 9"></polyline>
                </svg>
            
            
            </button>
            </div>
        </form>
        </div>
        
        </div>
    )
}

export default CreateBookingForm