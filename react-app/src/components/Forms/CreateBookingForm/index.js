import React, {useState} from "react";
import {useDispatch} from "react-redux"
import { add_booking } from "../../../store/booking";
import {allTimes} from '../../utils/allTimes'


function CreateBookingForm({serviceId}){
    console.log(serviceId,'form')
    const dispatch = useDispatch()
    const [date, setDate] = useState('')
    const [time_from, setTimeFrom] = useState('')
    const [time_to, setTimeTo] = useState('')
    const [service_id, setServiceId] = useState(serviceId)
  

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const payload ={
            date,
            time_from,
            time_to,
            service_id
            
        }
    
        const data = await dispatch(add_booking(service_id,payload))
        console.log(data,'DATAAAA')

        if(data.errors){
            console.log(data.errors)
        }

    }


    return(
        <div>
        <form onSubmit={handleSubmit}>
        <label>Date:</label>
        <input
        type = 'date'
        required
        value={date}
        onChange={(e)=>setDate(e.target.value)}
    
        />

        <label>Time:</label>
        <input
        type = 'time'
        required
        value={time_from}
        onChange={(e)=>setTimeFrom(e.target.value)}
        />


        <label>Time:</label>
        <input
        type = 'time'
        required
        value={time_to}
        onChange={(e)=>setTimeTo(e.target.value)}
        />
        
        
        <button type='submit'>Submit</button>
        </form>
        
        </div>
    )
}

export default CreateBookingForm