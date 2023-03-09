import React from 'react'
import { useSelector } from 'react-redux'
import banner from '../../../assets/images/3785210.jpg'

function AllServicesBrowser(){
const services = useSelector(state =>Object.values(state.services))



return (
    <div className='allServices-container'>
    
        <div>
            <img src={banner}/>
        asdasd
        </div>
    
                sdfasdfdsasadfsadfsadfasdf
    </div>


)




}
export default AllServicesBrowser