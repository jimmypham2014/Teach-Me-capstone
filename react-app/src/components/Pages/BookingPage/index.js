import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { getAllBookings, remove_booking } from "../../../store/booking"
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import './BookingPage.css'
import styled from '@emotion/styled'

export const StyleWrapper = styled.div`
  .fc-button.fc-prev-button, .fc-button.fc-next-button, .fc-button.fc-button-primary{
    background: red;
    background-image: none;
}

 .fc{
     width:40%;
     background: linear-gradient(135deg, #fdbb78 0%,#ff765f 100%);
     margin-left:auto;
     margin-right:auto;
     margin-top:auto;

 }
`

function Bookings(){
    const dispatch = useDispatch()
    const history = useHistory()
    const bookings = useSelector(state =>Object.values(state.booking))
    


const formatTime =(bookTime)=>{

    const [hours, minutes, seconds] = bookTime.split(":")
    let formattedHours = hours % 12
    formattedHours = formattedHours ? formattedHours :12
    console.log(formattedHours)
    const amOrPm = Number(hours) > 12 ? "PM" : "AM"
    const time = [String(formattedHours), minutes, seconds, amOrPm].join(":")
    console.log(time)

    return time
}

const formatDate = (date) =>{
    const [month, day, year] = date.split('/')
    console.log(month, day, year)
    const newDate = [year, (month < 10 ? '0'+month: month),day].join('-')
    console.log(newDate)
    return newDate
}


  console.log(bookings.map(book => formatDate(new Date(book.booking_date).toLocaleDateString())))

  
  const renderDate =()=>{
      bookings.map(book =>{
          return `${formatDate(new Date(book.booking_date).toLocaleDateString())}`
      })
  }

    useEffect(()=>{
        dispatch(getAllBookings())
    },[])
    return(
        <div className='booking_container'>
            <div>
        
            <h1>My current booking:</h1>
            {bookings.map(book=>{
            return(
            <div>
            <div>
            Date: {new Date(book.booking_date).toLocaleDateString()}
            </div>
            Time From: {formatTime(book.booking_time_from)}
            Time To: {formatTime(book.booking_time_to)}


            <button onClick={()=> dispatch(remove_booking(book.id))}>Cancel</button>
            <button onClick={()=>history.push(`/api/bookings/${book.id}/editform`)}>Edit</button>

          

            </div>
            
            )
        })}
        </div>

        
        <div className='calendar'> 
        <StyleWrapper>
        <FullCalendar
        height ='auto'
        width ='400'
        aspectRatio ='1'
        plugins={[ dayGridPlugin, timeGridPlugin ]}
        initialView="dayGridMonth"
        weekends ={false}
        events={ bookings.map(book=>{
            return{
                title: "Math",
                start:`${formatDate(new Date(book.booking_date).toLocaleDateString())}T${book.booking_time_from}`,
                end: `${formatDate(new Date(book.booking_date).toLocaleDateString())}T${book.booking_time_to}`,
                overlap:false,
                rendering:'background',
                color:'#ff9f89',
                textColor: "#1a4862",
			durationEditable: false,
            }
    
        })}
        timeFormat="h:mm"
    


         />

         </StyleWrapper>
         </div>

        </div>
    )
}

export default Bookings