import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import banner from '../../../assets/images/jeff-sheldon-9dI3g8owHiI-unsplash.jpg'
import './AllServicesBrowser.css'

function AllServicesBrowser(){
const services = useSelector(state => Object.values(state.service))
const users = useSelector(state => Object.values(state.otherUsers))



return (
    <div className='allServices-container w-fit h-auto'>
    
        <div className='allServices_img'>
            <img src={banner} className='w-2/4'/>
        </div>
    

        <div className='grid grid-cols-4 p-7' >
        {services.map(service=>{

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
                
    </div>


)




}
export default AllServicesBrowser