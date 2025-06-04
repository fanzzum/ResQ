import React from 'react'
import cam from '../assets/icons/cam.png'
const MissingReport = (props) => {
  return (
    <div className='flex  justify-center w-[1286px] h-[1225px] rounded-[38px] bg-[#e8e8e8] pt-10' style={{ boxShadow: 'inset -6px -7px 4px 0px #00000040' }}>
        <div className='flex flex-col flex-1 p-10 gap-8'>
            <p className='font-[700] text-[32px] font-poppins text-[#807B7B]'>BASIC INFORMATION</p>
            <div className='font-[300] text-[24px] font-poppins flex flex-col gap-5'>
                <p>Your name</p>
                <input className='input-style'></input>
                <p>Your Mobile Number</p>
                <input className='input-style'></input>
                <p>Your Location</p>
                <input className='input-style'></input>
                <p>Additional Note</p>
                <input className='input-style h-85'></input>
            </div>
        </div>
        <div  className='flex flex-col flex-1 p-10 gap-8'>
            <p className='font-[700] text-[32px] font-poppins text-[#807B7B]'>MISSING PERSON INFORMATION</p>
            <div className='font-[300] text-[24px] font-poppins flex flex-col gap-5'>
                <p>Name</p>
                <input className='input-style'></input>
                <p>Age</p>
                <input className='input-style'></input>
                <p>Gender</p>
                <input className='input-style'></input>
                <p>Clothing</p>
                <input className='input-style'></input>
                <p>Last Location</p>
                <input className='input-style'></input>
                <p>Last Seen Time</p>
                <input className='input-style'></input>
                <p>Last Seen Date</p>
                <input className='input-style'></input>
                <button className='bg-white w-48 h-12 rounded-[13px] flex items-center gap-5 p-3'><img src={cam} className='w-7'></img><p>Add Photo</p></button>
                <button className='w-50 h-17 bg-[linear-gradient(0deg,#274659,#000000,#10222C)] text-white font-inter font-[500] text-[28px] rounded-[8px] ml-90'>SUBMIT</button>
            </div>

        </div>
    </div>
  )
}

export default MissingReport