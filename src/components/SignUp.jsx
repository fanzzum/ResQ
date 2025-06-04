import React from 'react'
import signUp from '../assets/icons/signUp.png'
const SignUp = () => {
  return (
    <div className='w-260 h-176 bg-[#ffffff13] backdrop-blur-[4px] shadow-[-6px_6px_4px_3px_#00000025] m-20 rounded-[57px] flex flex-col items-center'>
      <p className='font-poppins font-[600] text-[64px] text-transparent bg-clip-text bg-gradient-to-b from-[#173141] to-[#396C8B] inline-block h-[96px]'>Sign up</p>
      <div className='flex items-center p-10'>
        <div className='flex flex-col gap-10'>
          <input type="text" placeholder="Email Address" className='input-style2 font-poppins text-[20px] font-[275]' />
          <input type="text" placeholder="Password" className='input-style2 font-poppins text-[20px] font-[275]' />
        </div>
        <div>
          <img src={signUp} />
        </div>
      </div>
      <div className='flex'>
        <button className='font-poppins text-[20px] font-[275] text-[#457B9D] bg-[#F5FBC3] w-29 h-9 rounded-[13px] flex justify-center items-center'>Next</button>
        <p className='ml-30 font-poppins font-[400] text-[20px] text-[#1D3557]'>Already have an account? <a className='font-[700]'>Log in</a></p>

      </div>
    </div>
  )
}

export default SignUp