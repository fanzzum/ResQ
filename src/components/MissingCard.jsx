import React from 'react'
import chatbot from '../assets/pictures/chatbot.png'

const MissingCard = (props) => {
  return (
    <div className='w-[648px] h-80 bg-[#D9D9D9] rounded-lg shadow-[0px_4px_4px_0px_#00000040] flex items-center gap-14 p-10'>
      <img src={chatbot} alt='yo' className='w-40 h-48 rounded-lg bg-white' />
      
      <div className='flex flex-col gap-5'>
        <div className='flex flex-col leading-none'>
          <p className='text-3xl font-normal font-inter'>Md. Farhan</p>
          <p className='text-xs font-extralight italic font-inter'>reported 3 hours ago</p>
        </div>

        <div className='flex flex-col text-base font-inter font-normal'>
          <p>Approximate Age :</p>
          <p>Gender :</p>
          <p>Clothing :</p>
          <p>Last Location :</p>
        </div>

        <div className='flex gap-28'>
          <p className='text-base font-extralight italic font-inter'>100% confidence</p>
          <a className='text-xs font-extralight italic font-inter underline'>View Details</a>
        </div>
      </div>
    </div>
  )
}

export default MissingCard



