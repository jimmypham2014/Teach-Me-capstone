import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory, useParams } from "react-router-dom";
import { getSingleService,deleteService, getAllServices } from "../../../store/service";
import CreateBookingForm from "../../Forms/CreateBookingForm";
import './SingleServicePage.css'
import {TbCategory} from 'react-icons/tb'
import {FaUniversity} from 'react-icons/fa'
import {IoMdSchool} from 'react-icons/io'
import Chat from "../../Chat";
import {AiOutlineCloseCircle} from 'react-icons/ai'
import styled from '@emotion/styled'
import CreateReviewForm from "../../Forms/CreateReviewForm";
import { deleteReview, getAllReviews } from "../../../store/review";
import {Rate} from 'antd'
import {AiOutlineMenu} from 'react-icons/ai'
import ModalImage, {Lightbox} from 'react-modal-image'


export const StyleWrapper = styled.div`

.chat-container {
    width: 40rem;
    position: fixed;
    bottom:0px;
    right:200px;
     background-color:white;
   
    }
    
#scrollableDiv{
    height: 400px;
}

#react-modal-image-img{
    width:40rem;
}

}
   
`

function ServiceDetailPage(){
    const dispatch = useDispatch()
    const {serviceId} = useParams()
    const service = useSelector(state => state.service[serviceId])
    const sessionUser = useSelector(state=>state.session)
    const history = useHistory()
    const tutors = useSelector(state=> Object.values(state.tutors))
    const users = useSelector(state => Object.values(state.otherUsers))
    const reviews = useSelector(state=> Object.values(state.reviews))
    const otherUsers = useSelector(state=> Object.values(state.otherUsers))
    const allServices = useSelector(state =>Object.values(state.service))
    const messagesEndRef = useRef(null)
    const ulRef = useRef();
    const [showMenu, setShowMenu] = useState(false);
    const [getAvgRating, setGetAvgRating] = useState(0)
  
    const [reviewButton, setReviewButton] = useState(false);
    const [buttonStatus, setButtonStatus] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
      };

   const ulClassName = "review-dropdown" + (showMenu ? "" : " hidden");

   
   const specificReviews = reviews.filter(review => String(review.service_id) === serviceId)
   const allRatingNumbers = specificReviews.map( review => review.rating)
   const averageRating = parseFloat(((allRatingNumbers.reduce((partialSum,a) => partialSum +a,0)) / specificReviews.length).toFixed(2))
    


    useEffect(() => {
        if (!showMenu) return;
    
        const closeMenu = (e) => {
          if (!ulRef.current?.contains(e.target)) {
            setShowMenu(false);
          }
        };
    
        document.addEventListener("click", closeMenu);
    
        return () => document.removeEventListener("click", closeMenu);
      }, [showMenu]);
    
    
      useEffect(()=>{
        messagesEndRef.current?.scrollIntoView()
    },[])
    




        useEffect(()=>{
            dispatch(getSingleService(serviceId))
            dispatch(getAllReviews())
            setGetAvgRating(averageRating)
    
        },[dispatch,averageRating, getAvgRating])
    
 
    const handleClick = ()=>{
        if (buttonStatus ===false){
            setButtonStatus(true)
        }else{
            setButtonStatus(false)
            
        }
    }

    const writeAReview = ()=>{
        if (reviewButton ===false){
            setReviewButton(true)
        }else{
            setReviewButton(false)
            
        }

    }



   

  
    const removeService = ()=>{
        dispatch(deleteService(serviceId))
        history.push('/')
    }

  
   

    if(!service){
        return null
    }

    const editService = ()=>{
        history.push(`/services/${serviceId}/editform`)
    
    }

    const specificTutor = tutors.filter(tutor => service.tutor === tutor.user_id)
    const specificUser = users.filter(user => user.id === service.tutor)

    

   const formatUTCDate = (date) =>{
    let myDate = new Date(date)

    return myDate.toLocaleString()
}




    return(

        <div className='2xl:flex 2xl:flex-row  xl:flex xl:flex-row justify-center py-5 sm:flex-col md:flex-col relative '>

            <div >
                {service&&(
                    <div >
                        <div>
                            <h1 className='font-bold text-2xl'>{service.title}</h1>
                        </div>
                         <div className='flex items-center'>
                           <TbCategory/>
                           <div className='pl-2'>
                           {service.subject}
                           </div>
                           
                        </div>
                        <div className='border'></div>

                        <div className='flex'>
                            {specificUser.map((user,ind)=>{
                                return(
                                    <div key={ind} className ='flex items-center justify-between'>
                                        <div className='w-9 p-1'> 
                                        {user.profileImg &&(
                                        <img src={user.profileImg}/>
                                        )}
                                        </div>
                                        <div id='username'>{user.username}</div>
                                       
                                    </div>
                                )
                            })}
                        
                        </div>

                        <div className='single_service_image w-[50rem] '>
                            <img src={service.image}/>
                        </div>
            
                     </div>
                 )}
        
                    {sessionUser && service.tutor && service.tutor === sessionUser.user.id ? 
                    <div className='modify_btn'>
                        <button  onClick={editService}>Edit</button>
                        <button  onClick={removeService}>Delete</button> 
                    </div>: null}


                    <div className='p-2'>
                    <h4 className='font-bold text-xl'>About this service</h4>
                       <p className='m-3'>{service.description}</p> 
                    </div>

                    <div className='border'></div>

                    

                  <div className='p-2'>
                  <h4 className='font-bold text-xl'>About The Tutor</h4>
                        <div>
                    {specificUser.map(user=>{
                        return(
                           <div className='flex items-center '>
                                <div className='w-[100px] p-2'>
                                    {user.profileImg &&(
                                    <img src={user.profileImg}/>
                                    )}
                                </div>

                                <div className ='about_me_details'>
                                    <div id='first_last'>{user.firstName}, {user.lastName}</div> 
                                    <div id='about_me_username'>{user.username}</div>
                                 </div>
                           
                           </div>

                        )
                    })}
                    </div>

                    <div>
                        <h5 className='font-bold'> About me</h5>
                        <div>
                        {specificUser.map(user=>{

                            return(
                                <div>
                                {user.description}
                                </div>
                            )
                        })}

                        </div>
                       {specificTutor.map(tutor=>{
                           return(

                            <div>
                            <div className='flex items-center'>
                            <FaUniversity/> 
                            <div className='pl-2'>
                            
                            {tutor.education}
                            </div>

                            </div>
                            <div className='flex items-center'>
                                <IoMdSchool/> 
                                <div className='pl-2'>
                                {tutor.credentials}
                                </div>
                            </div>
                              
                            </div>
                       
                           )
                       })}
                    
                    </div>
                  
                  </div>
                    <div className='absolute'>
                  {specificUser[0]?.id !== sessionUser.user.id && 
                     (!buttonStatus ? (
                         <button onClick={handleClick} className='relative left-[400px] bottom-[100px] btn bg-black w-[210px]'><span>Contact Me</span></button>
                     ): (
                       
                         <div className='border carousel  z-[1] bg-white  fixed bottom-[70px] right-[200px] w-[40em]' >
                         <div className='flex justify-between border-solid border-b-2 border-black'>
                         <div className='flex items-center m-2'>
                         <img  className ='w-9 rounded-full p-1' src= {specificUser[0].profileImg}/> 

                         {specificUser[0].username}
                         </div>
                         
                        <button className='p-1 hover:bg-gray-100 hover:rounded-full flex justify-end ' onClick={handleClick}>
                        
                        <AiOutlineCloseCircle />
                        
                        </button> 
                        </div>
                        
                        <div className='h-[400px] z-10 bg-white '>
                        <StyleWrapper>
                        <Chat userId = {specificUser[0]?.id} username= {specificUser[0]?.username} messagesEndRef={messagesEndRef}/>
                        </StyleWrapper>
    
                        </div>
                        </div>

                      
                     )
                    )
                 
                    }
                    </div>


                    <div className='border mt-3 '> </div>
                    <div>
                        <div className ='text-2xl text-bold '> Reviews</div>

                        <div>{specificReviews.length} reviews for this service <Rate value={getAvgRating}   allowHalf disabled/> {averageRating ? averageRating : 0}</div>
                        
                        {specificReviews.map((review,ind)=>
                    {
                        return(
                            <div className='flex  '>

                            
                        <div key={ind} className='flex items-center m-4'>
                           {otherUsers.map(user => user.id === review.user_id && 
                            
                                <div>
                              
                                <div className='flex'>
                                <img className='w-[40px] rounded-full' src={user.profileImg}/>

                                <div className='m-2 text-xl'> 
                                {user.username}:
                                </div>

                                </div>
                                <div>
                          

                                <div className='m-2 '>
                               <div>{review.comments}</div>
                                </div>

                                <div >
                                <StyleWrapper>
                                   <ModalImage className='w-8' large={review.reviewImage} small={review.reviewImage}/>
                                   </StyleWrapper>
                              
                                </div>

                                 <div className='m-2'>
                                 <Rate defaultValue={review.rating} disabled allowHalf   />

                                 </div>

                                {formatUTCDate(review.timestamp)}


                                 </div>

                                </div>)

                            
                           }

                        
                            </div>

                            <div className='m-8 relative'>
                            {review.user_id && review.user_id === sessionUser.user.id ?
                            <button className='ml-[250px] hover:bg-gray-300 hover:rounded-full ' onClick={openMenu}> <AiOutlineMenu/></button>: null}
                            { review.user_id === sessionUser.user.id &&
                            <ul className={ulClassName} ref={ulRef} >
                                {sessionUser && (
                                    <>
                                    <li><button className='hover:bg-gray-200 hover:rounded-full w-[100px]' onClick={()=> dispatch(deleteReview(review.id))}>Delete</button></li>
                                    <li><button className='hover:bg-gray-200 hover:rounded-full w-[100px]' >Update</button></li>
                                    </>
                                )}
                            </ul>
                        }

                            

                               
                            
                            </div>
                            </div>
                        )
                    })


                    
                
                }
                    
                    

                    {!reviewButton  ?<button className='btn bg-black z-0' onClick={writeAReview}><span>Write a review</span></button>
                    
                        :
                        <div className='border'>
                        <div className='flex justify-end'>
                        <button className='p-1 hover:bg-gray-100 hover:rounded-full flex justify-end ' onClick={writeAReview}>
                                                <AiOutlineCloseCircle size={30}/>
                        </button> 

                        </div>
                        <CreateReviewForm serviceId ={service.id} handleClick={handleClick}/>
                        </div>
                        }

                      


                    </div>
                  
                </div>
                <div className= 'z-0 bg-white ml-[100px] sm:flex sm:flex-col sm:items-center sm:w-[0px] sm:relative  lg:flex lg:flex-col lg:w-[300px] md:fixed md:top-[20rem] md:right-[10rem] '>
                <CreateBookingForm serviceId ={service.id}/>
                </div>


        </div>
        
    )
}

export default ServiceDetailPage