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
        console.log(date)

        if(data.errors){
            setErrors(data.errors)
        }else{
            history.push('/bookings')
        }

    }



    return(
        <div className='booking flex flex-col justify-center items-center border-2 w-[220px] h-[250px] sm:w-[300px] z-1 bg-white'> 

        <div className='font-bold'>
            Book a session
        
        </div>

        

        <span></span>
        <div className='-z-1'>
        <form onSubmit={handleSubmit}>
        
        {errors ?
            <div className='errors'>
            {errors}
            </div>
            :
            null
       }
       <div className='border'></div>

        <div className='flex flex-col items-center'>
        <label>Pick a date</label>
        <div >
        <input
        type = 'date'
        required
        value={date}
        onChange={(e)=>setDate(e.target.value)}
        />
        </div>
        </div>


       
        <div className='booking_time'>
            <div>
        <label>At: </label>
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
  

        
            
        <button className='submit_edit_booking_btn bg-black ' type='submit'><span>Book</span></button>
           
        </form>
        </div>
        
        </div>
    )
}

export default CreateBookingForm