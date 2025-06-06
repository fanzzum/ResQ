import React, { useState } from 'react'
import signUp from '../assets/icons/signUp.png'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password1 || !password2) {
      alert('All fields are required')
      return
    }
    if (password1 !== password2) {
      alert('Passwords do not match')
      return
    }
    try {
      const res = await fetch('https://xylem-api.ra-physics.space/rest-auth/registration/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password1, password2 }),
      })
      const data = await res.json()
      if (res.ok) {
        alert('Signup successful! You can now log in.')
        // Clear form or redirect here
      } else {
        alert(data.message || 'Signup failed')
      }
    } catch (err) {
      alert('Network error or server down')
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex items-center p-10'>
      <div className='w-260 h-176 bg-[#ffffff13] backdrop-blur-[4px] shadow-[-6px_6px_4px_3px_#00000025] m-20 rounded-[57px] flex flex-col items-center'>
        <p className='font-poppins font-[600] text-[64px] text-transparent bg-clip-text bg-gradient-to-b from-[#173141] to-[#396C8B] inline-block h-[96px]'>Sign up</p>
        <div className='flex items-center p-10'>
          <div className='flex flex-col gap-10'>
            <input type="text" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} className='input-style2 font-poppins text-[20px] font-[275]' />
            <input type="password" placeholder="Password" value={password1} onChange={e => setPassword1(e.target.value)} className='input-style2 font-poppins text-[20px] font-[275]' />
            <input type="password" placeholder="Confirm Password" value={password2} onChange={e => setPassword2(e.target.value)} className='input-style2 font-poppins text-[20px] font-[275]' />
          </div>
          <div>
            <img src={signUp} />
          </div>
        </div>
        <div className='flex'>
          <button type="submit" className='font-poppins text-[20px] font-[275] text-[#457B9D] bg-[#F5FBC3] w-29 h-9 rounded-[13px] flex justify-center items-center ml-6'>Next</button>
          <p className='ml-30 font-poppins font-[400] text-[20px] text-[#1D3557]'>
            Already have an account? <a href="/login" className='font-[700]'>Log in</a>
          </p>
        </div>
      </div>
    </form>
  )
}

export default SignUp
