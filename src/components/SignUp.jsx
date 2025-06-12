import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import signUp from '../assets/icons/signUp.png'

const SignUp = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatitude(pos.coords.latitude)
        setLongitude(pos.coords.longitude)
      },
      () => alert("Location access denied. Can't register without location."),
      { enableHighAccuracy: true }
    )
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password1 || !password2 || !name || !phone || !address) {
      alert('All fields are required');
      return;
    }

    if (password1 !== password2) {
      alert('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('https://xylem-api.ra-physics.space/volunteer/registration/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          address,
          latitude,
          longitude,
          password1,
          password2,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Signup successful! Please check your email to verify your account before logging in.');
        navigate('/login');
      } else {
        alert(data?.message || data?.error || 'Signup failed');
      }
    } catch (err) {
      console.error('Signup error:', err);
      alert('Network error or server down');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex items-center p-10'>
      <div className='w-260 h-176 bg-[#ffffff13] backdrop-blur-[4px] shadow-[-6px_6px_4px_3px_#00000025] m-20 rounded-[57px] flex flex-col items-center'>
        <p className='font-poppins font-[600] text-[64px] text-transparent bg-clip-text bg-gradient-to-b from-[#173141] to-[#396C8B] inline-block h-[96px]'>Sign up</p>
        <div className='flex items-center p-10'>
          <div className='flex flex-col gap-6'>
            <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} className='input-style2' />
            <input type="text" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} className='input-style2' />
            <input type="text" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} className='input-style2' />
            <input type="text" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} className='input-style2' />
            <input type="password" placeholder="Password" value={password1} onChange={e => setPassword1(e.target.value)} className='input-style2' />
            <input type="password" placeholder="Confirm Password" value={password2} onChange={e => setPassword2(e.target.value)} className='input-style2' />
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
