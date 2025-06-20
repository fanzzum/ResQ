import React, { useEffect, useState } from 'react'
import avatar from '../assets/icons/avatar.png'
import search from '../assets/icons/search.png'
import axios from 'axios'

const AdminProfile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
  })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('access')
        if (!token) return

        // This endpoint expects a POST with credentials to return user info.
        // If you already have the user info from login, you can store it in localStorage and use it here instead.
        // Otherwise, you may need to use a "me" endpoint if available.
        // For demo, let's assume you have the user info in localStorage after login:
        const userInfo = JSON.parse(localStorage.getItem('user'))
        if (userInfo) {
          setUser({
            name: userInfo.first_name || userInfo.username || '',
            email: userInfo.email || '',
            phone: userInfo.phone || '', // If phone is not in user, leave blank
          })
        }
      } catch (err) {
        console.error('Failed to fetch user info:', err)
      }
    }
    fetchUser()
  }, [])

  return (
    <div className='w-full h-full bg-white p-15 gap-10 flex flex-col inter'>
      <p className='font-[800] text-[60px] text-transparent bg-clip-text bg-gradient-to-r from-[#7A6969] to-[#E0C0C0] inline-block'>PROFILE</p>

      <div className='flex  bg-[#6e636325] gap-20 p-13 rounded-[15px]'>
        <img src={avatar} className='w-2/7'/>
        <div className='flex flex-col pl-5'>
          <p className='font-[600] text-[48px]'>Welcome back</p>
          <p className='font-[400] text-[48px]'>{user.name}!</p>
          <div className='flex justify-between gap-70'>
            <div className='flex flex-col'>
              <p className='font-[500] text-[20px]'>{user.email}</p>
              <p className='font-[500] text-[20px]'>{user.phone || '+8801555555555'}</p>
              <p className='font-[500] text-[20px]'><span className='font-bold inline'>Organization :</span> Red Cresent</p>
            </div>
            <div className='flex flex-col'>
              <p className='font-[500] text-[20px]'><span className='font-bold inline'>Blood Group :</span> O+ve</p>
              <p className='font-[500] text-[20px]'><span className='font-bold inline'>Address :</span> 3/16, Bhuter Goli, Mirpur</p>
            </div>
          </div>
          <div className='flex justify-between'>
            <p className='font-[200] text-[20px] italic'>Joined Date : 1st June, 2025</p>
            <button className='flex items-center text-white pt-2 pb-2 pl-3 pr-3 rounded-[8px]  justify-center bg-[linear-gradient(180deg,#165179,#2E5E7F,#5F8BA7)]'>EDIT</button>
          </div>
        </div>
        <div></div>
      </div>

      {/* Header */}
      <div className='flex items-center justify-between'>
        <p className='text-transparent bg-clip-text bg-gradient-to-r from-[#7A6969] to-[#E0C0C0] inline-block font-[700] text-[60px]'>MISSING REPORTS</p>
        <div className='flex items-center'>
          <input
            className='bg-[#9F9F9F] w-74 pl-13 h-12 rounded-[10px] placeholder:text-white placeholder:font-[400] placeholder:text-[24px]'
            placeholder='search'
          />
          <img src={search} className='absolute ml-4 w-7' alt="Search" />
        </div>
      </div>
    </div>
  )
}

export default AdminProfile