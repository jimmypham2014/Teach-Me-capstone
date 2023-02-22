import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllBookings } from "../../../store/booking"


function Bookings(){
    const dispatch = useDispatch()
    const bookings = useSelector(state =>state.booking)

    console.log(bookings)


    useEffect(()=>{
        dispatch(getAllBookings())
    },[])

    return(
        <div>

        
        </div>
    )
}

export default Bookings