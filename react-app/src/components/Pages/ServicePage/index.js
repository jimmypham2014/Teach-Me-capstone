import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory, useParams } from "react-router-dom";
import { deleteService, getAllServices } from "../../../store/service";
import EditServiceForm from "../../Forms/EditServiceForm";
import './ServicePage.css'
import heart from '../../../icons/favorite.png'
import { getAllTutors } from "../../../store/tutor";
import banner from '../../../assets/images/banner_img.jpg'
import {AiOutlineArrowLeft,AiOutlineArrowRight} from 'react-icons/ai'

function ServicePage(){

    const services = useSelector(state => Object.values(state.service))
    const users = useSelector(state => Object.values(state.otherUsers))
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(()=>{
        dispatch(getAllServices())
        dispatch(getAllTutors())
    },[dispatch])


    const scrollLeft=()=>{
        document.getElementById('services_content').scrollLeft -=400
    }
    //  


    const scrollRight=()=>{
        document.getElementById('services_content').scrollLeft +=400
    }


    return (
        <div className='service_containers'>
        <div className='service_banner'>
            <img src={banner}/>
            <div className='banner_info'>
            <h1 className ='banner_title_1 text-center'>Introducing TEACH</h1>
            <h3 className ='banner_title_2'>Work Smarter, Not <span className='text-white line-through'>Harder</span> </h3>
            <button className='banner_btn' onClick={()=> history.push('/services')}><span>View All Services</span> </button>
          
            </div>
        </div>
        
        <div className='pt-8'>
            <div className='flex justify-center '>
            <h1 className='text-xl font-semibold'>Services</h1> 
            </div>
              
        <div className='border'></div>

        </div>


        <div className='flex items-center'>

        <div>
            <button onClick={scrollLeft} className='p-2 m-2 rounded-full bg-gray-50 hover:bg-gray-600 active:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300'><AiOutlineArrowLeft/></button>
        </div>

        
       

        <div id='services_content' className ='carousel p-4 flex items-center justify-start overflow-x-auto scroll-smooth scrollbar-hide m-4'>

        
        {services.map((service)=>{
            return (
                <Link key={service.id} to={`/services/${service.id}`} className="service_container my-1">
                    <div className="service_detail p-2 m-2 transition ease-in-out delay-200 hover:-translate-y-1 hover:scale-110"> 

                        <div id='details'>

                            <div className='service_image'>
                                <img src={service.image}/>
                            
                            </div>

                        
                            <div id='subject_info'>
                                <div>
                                Subject: {service.subject}
                                </div>
                                <div>
                                Subject Level: {service.subject_level}
                                </div>
                            </div>
                           
                             
                        </div>

                        <div className='tutor_info'>
                        {users.map(user=>{
                            if(service.tutor === user.id){
                                return(
                                    <div id='details'> 
                                        <div id='prof_image'>
                                        <img src={user.profileImg}/> 
                                        </div>  
                                        <div id='username'>
                                        {user.username}
                                        </div>
                                    </div>
                                )
                            }
                        })}
                        
                        </div>
                        <div id='title'>
                            {service.title}
                        </div>


                        <div className='favorite_price'>
                                <div>
                                    <h5>My rate is ${service.price}/hr</h5>
                                </div>
                        
                        </div>


                    </div>
                
                </Link>
                
            )
            
        })}
        
        </div>

        <div>
            <button onClick={scrollRight} className='p-2 m-2 rounded-full bg-gray-50 hover:bg-gray-600 active:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300' ><AiOutlineArrowRight/></button>
        </div>
        
        </div>


        </div>
        
    )


}

export default ServicePage