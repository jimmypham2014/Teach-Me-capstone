import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import banner from '../../../assets/images/jeff-sheldon-9dI3g8owHiI-unsplash.jpg'
import './AllServicesBrowser.css'

function AllServicesBrowser(){
const services = useSelector(state => Object.values(state.service))
const users = useSelector(state => Object.values(state.otherUsers))



return (
    <div className='allServices-container mx-auto py-13 '>
    
        <div className='allServices_img p-1 flex items-center justify-center cover'>
            <img src={banner} className='w-2/4 object-fill'/>
        </div>
    

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-5 gap-[54px] max-w-sm max-auto md:max-w-none md:mx-0' >
        {services.map(service=>{

            return (
                <Link key={service.id} to={`/services/${service.id}`} className=" w-[200px] h-[340px] pt-8">
                    <div className=" details border border-[#e4e4e] mb-4 relative overflow-hidden group tranistion hover:scal-125 rounded-t-lg "> 

                        <div  className='w-full h-full  flex justify-center items-center'>

                            <div className=' mx-auto flex justify-center items-center'>
                            
                                <img className='max-h-[160x] h-[140px] group-hover:scale-110  transition duration-500 ease-in-out rounded-t-lg ' src={service.image}/>
                            </div>
                        
                        </div>

                        <div>
                            <h2 className='font-semibold mb-1 pt-2 pl-2'>Subject: {service.subject}</h2>
                            <h2 className='font-semibold mb-1 pl-2'>Subject-Level: {service.subject_level}</h2>
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

                        <div>
                        <h2 className='font-semibold mb-1 pl-2'>{service.title}</h2>
                        </div>

                        <div className='mb-1 pl-2'>
                            My rate is ${service.price}/hr
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