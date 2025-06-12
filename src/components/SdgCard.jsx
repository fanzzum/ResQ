import React from 'react'

const SdgCard = (props) => {
  return (
    <div className='w-72 h-127 bg-[linear-gradient(180deg,#FFFFFF20,#FFFFFF05)] p-5 flex flex-col gap-6  rounded-[10px] border-[3px] border-[#ffffff05] backdrop-blur-[50px] shadow-[7px_8px_4px_0px_rgba(255,255,255,0.05)]'>
        <img src={props.icon} className=' h-40 object-contain'/>
        <div className='pb-7'>
        <p className='font-inter font-[800] text-[24px] text-[#C3E88D]'>SDG {props.num}</p>
        <p className='font-inter font-[800] text-[24px] text-[#C3E88D]'>{props.title}</p>
        </div>
        <p className='font-inter font-[300] text-[20px] text-white'>{props.desc}</p>
    </div>
  )
}

export default SdgCard