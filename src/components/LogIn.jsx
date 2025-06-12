import React, { useState } from 'react'
import signUp from '../assets/icons/signUp.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const LogIn = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Both fields required");
      return;
    }

    try {
      const res = await axios.post(
        'https://xylem-api.ra-physics.space/rest-auth/login/',
        {
          username: email,  // rest-auth expects 'username' even if you use email login
          password,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const data = res.data;
      if (data.key) {  // rest-auth returns a token key on successful login
        localStorage.setItem('token', data.key);
        navigate('/');
      } else {
        alert('Login failed: No token received');
      }
    } catch (err) {
      console.error('Login error:', err);
      const msg = err.response?.data?.non_field_errors?.[0] || 'Invalid credentials or server error';
      alert(msg);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='w-260 h-176 bg-[#ffffff13] backdrop-blur-[4px] shadow-[-6px_6px_4px_3px_#00000025] m-20 rounded-[57px] flex flex-col items-center'>
        <p className='font-poppins font-[600] text-[64px] text-transparent bg-clip-text bg-gradient-to-b from-[#173141] to-[#396C8B] inline-block h-[96px]'>
          LOG IN
        </p>
        <div className='flex items-center p-10'>
          <div className='flex flex-col gap-10'>
            <input
              type="text"
              placeholder="Email Address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className='input-style2 font-poppins text-[20px] font-[275]'
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className='input-style2 font-poppins text-[20px] font-[275]'
            />
          </div>
          <div>
            <img src={signUp} />
          </div>
        </div>
        <div className='flex'>
          <button
            type="submit"
            className='font-poppins text-[20px] font-[275] text-[#457B9D] bg-[#F5FBC3] w-29 h-9 rounded-[13px] flex justify-center items-center'>
            Next
          </button>
          <p className='ml-60 font-poppins font-[400] text-[20px] text-[#1D3557]'>
            New here? <Link to="/signup" className='font-[700]'>Sign Up</Link>
          </p>
        </div>
        <div>
          <Link className='text-[#1D3557] font-poppins' to="/forgot-password">
            Forgot Password?
          </Link>
        </div>
      </div>
    </form>
  )
}

export default LogIn
