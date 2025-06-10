import React from 'react'

const AskAi = () => {
  return (
    <div className='flex flex-col items-center gap-10 bg-transparent'>
        <p className='font-inter font-[400] text-[32px] text-white w-[1100px] text-center'><div className='inline font-[700]'>Looking for someone?</div> Let our AI help.<br/>Enter any detail—name,
           date, or location—and we'll search through all<br/> reports available 
           online to assist you in finding your loved one.</p>
           <input className='w-184 h-16 bg-white rounded-[10px] font-inter font-[200] placeholder:italic text-[20px] p-7' placeholder='Ask Ai for information or submit missing report.... '>

           </input>
    </div>
  )
}

export default AskAi