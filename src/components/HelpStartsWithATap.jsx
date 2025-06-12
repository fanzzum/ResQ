import React from 'react'
import girl from '../assets/pictures/girl.png'
const HelpStartsWithATap = () => {
  return (
    <div className='w-360 h-256  bg-[linear-gradient(180deg,#1F6492,#35719A,#4A85AD,#5B98C1)] flex justify-center items-center'>
        <div className='bg-[#5F5E5E10] rounded-[95px] w-341 h-180 border-[3px] border-[#ffffff10] flex items-center relative'>
            <div className=' p-22 absolute'>
                <p className='font-poppins font-[700] text-[60px] text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] to-[#F2DF65] inline-block'>Help starts with a tap</p>
                <p className='font-poppins font-[500] text-[32px] text-white'>Real-time missing person alerts at <br/>your fingertips</p>
                <p className='font-poppins font-[300] text-[24px] text-white pt-10 w-155'>Every second counts in a rescue. With ResQMap,<br/>
                 citizens can <div className='inline text-[#1E385B]'>report</div> missing individuals, receive <div className='inline text-[#1E385B]'>live</div><br/>
                  <div className='inline text-[#1E385B]'>updates</div> about every single missing report<br/>
                   available online, and <div className='inline text-[#1E385B]'>support</div> verified responders —<br/>
                    all from their phones.</p>
            </div>

            <img src={girl} className='w-290 absolute left-80'/>
        </div>
    </div>
  )
}

export default HelpStartsWithATap