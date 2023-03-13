import React from 'react'
import about_image from '../../../assets/images/about.jpeg'
import github from '../../../icons/github.png'
import linkedin from '../../../icons/linkedin.png'

function About(){

    return(
        <div>
        <div className='relative -z-1 flex justify-center pt-3 items-center'>

            <img className= 'xl:object-contain xl:w-[1000px] xl:h-[600px] sm:w-[500px] sm:h-[200px] sm:object-contain' src={about_image}/>


            <div className='absolute z-1 top-[100px]'>
            <div>
            <h1 className='text-bold text-2xl text-white bottom-3'>About</h1>
            </div>
             

            <div className='flex absolute justify-center items-center -left-[90px]'>
            <div>
            
             <a href='https://github.com/jimmypham2014/Teach-Me-capstone' className='flex items-center p-4'>
             
             <div className='w-[50px]'>
             <img src={github}/> 
             </div>
             
             <div>
             <h1 className='text-white'>
                Github
             </h1>
             </div>
             
             
             </a>
             </div>

            <div>
           
             <a href='https://www.linkedin.com/in/jimmy-pham1418/' className='flex items-center p-4 hover:text-black'>
             
             <div className='w-[40px]'>
             <img src={linkedin}/> 
             </div>
             
             <div>
             <h1 className='text-white'>
                LinkedIn
             </h1>
             </div>
             
             
             </a>

             </div>

             </div>



            </div>
        </div>

        
        </div>

    )
}

export default About