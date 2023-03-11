import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { getAllBookings, remove_booking } from "../../../store/booking"
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import './BookingPage.css'
import styled from '@emotion/styled'
import edit from '../../../icons/edit.png'
import cancel from '../.././/../icons/cancel.png'
import calendar from '../../../icons/calendar.png'
import OpenModalButton from "../../OpenModalButton"
import EditBookingForm from "../../Forms/EditBookingForm"

export const StyleWrapper = styled.div`


 .fc{
     width: 130%;
     height: 700%
     border:1px solid black;
     border-radius: 10px;
     margin-left: 10rem;
     box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
     z-index:-1;

 }

 .fc-day-number {
    font-size: 1.5em;
    color: #5c005c;
  }
  .fc-title{
    font-size: .9em;
  }

.fc-event-title{
    font-size: 10px;
    
}

}
`

function Bookings(){
    const dispatch = useDispatch()
    const history = useHistory()
    const bookings = useSelector(state =>Object.values(state.booking))
    const services = useSelector(state =>Object.values(state.service))
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();



 const closeMenu = () => setShowMenu(!showMenu);
    
   

const formatTime =(bookTime)=>{

    const [hours, minutes, seconds] = bookTime.split(":")
    let formattedHours = hours % 12
    formattedHours = formattedHours ? formattedHours :12

    const amOrPm = Number(hours) > 12 ? "PM" : "AM"
    const time = [String(formattedHours), minutes, seconds].join(":") + ' '+ amOrPm


    return time
}

const formatDate = (date) =>{
    const newDate =  new Date(date).toUTCString().slice(0,16)
    return newDate
   
}



const formatUTCDate = (date) =>{
    let utc = new Date(date).toUTCString()
    let newDate = (new Date(utc).getDate() + 1) < 10? '0' + (new Date(utc).getDate() + 1) :(new Date(utc).getDate() + 1)
    let newMonth = (new Date(utc).getMonth() + 1) <10 ? '0' + (new Date(utc).getMonth() + 1) : (new Date(utc).getMonth() +1)
    let newYear = new Date(utc).getFullYear()
    
    let updatedDate = [newYear,newMonth,newDate].join('-')
    return updatedDate

}


    useEffect(()=>{
        dispatch(getAllBookings())
    },[])
    return(
        <div className='booking_container'>
            <div className = 'booking_details '>
        
            <h1>Upcoming Bookings</h1>
            {bookings.map(book=>{
                return (

                <div className='booking_info w-80'>

                <div id='image'>
                {services.map(service =>service.id === book.service_id ? <img src={service.image}/>:null)}
                </div>


                <div id='name' className='flex items-center'>
                        <div>
                        {services.map(service =>service.id === book.service_id ? (service.title):null)}
                        </div>
                        
                        <div className='flex'>
                        <div><img src={calendar}/> </div>
                       <div>
                       {formatDate(book.booking_date)}
                       </div> 
                        </div>
                        
                        <div>
                            <div>
                                AT: {formatTime(book.booking_time_from)}
                            </div>
                            <div>
                            TO: {formatTime(book.booking_time_to)}
                            
                            </div>

                        </div>

                        <div>
                        <button onClick={()=> dispatch(remove_booking(book.id))}><img src={cancel}/></button>

                        <OpenModalButton

                        buttonText={<img src={edit}/>}
                        onItemClick={closeMenu}
                        modalComponent={<EditBookingForm bookId={book.id} closeMenu={closeMenu} setShowMenu ={setShowMenu} showMenu={showMenu}/>}
                      />
                       </div>
                        
                </div>



               
          

            </div>
            
            )
                })}
            </div>

        
     
        <StyleWrapper>
        <FullCalendar
        className='w-2'
        plugins={[ dayGridPlugin, timeGridPlugin ]}
        defaultView="dayGridMonth"
        headerToolbar={{
            left:'today,prev,next',
            center:'title',
            right: "dayGridMonth,timeGridWeek,timeGridDay"
        }}
        weekends ={true}
        events={ bookings.map(book=>{
            return{
                title: `${services.map(service => service.id === book.service_id ? `${service.title}`:null)}`,
                start: formatUTCDate(book.booking_date) +'T'+book.booking_time_from ,
                end: formatUTCDate(book.booking_date)+'T'+book.booking_time_to,
            }
    
        })}
        timeFormat="h:mm"
        timeZone = 'local'
        editable ={true}

         />

         </StyleWrapper>

         
         </div>

       
    )
}

export default Bookings