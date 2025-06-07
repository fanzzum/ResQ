import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const ResetPassword = () => {
  const { uid, token } = useParams()
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')

  const handleReset = async (e) => {
    e.preventDefault()
    if (password1 !== password2) return alert("Passwords don't match")

    try {
      const res = await fetch('https://xylem-api.ra-physics.space/rest-auth/password/reset/confirm/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid,
          token,
          new_password1: password1,
          new_password2: password2
        })
      })

      if (res.ok) {
        alert("Password changed. Go login.")
      } else {
        const data = await res.json()
        alert(JSON.stringify(data))
      }
    } catch (err) {
      alert("Network or server error")
    }
  }

  return (
    <form onSubmit={handleReset}>
      <div className='w-260 bg-[#ffffff13] m-20 p-10 rounded-[57px] flex flex-col items-center'>
        <h2 className='text-3xl text-white mb-10'>Reset Your Password</h2>
        <input
          type="password"
          placeholder="New Password"
          value={password1}
          onChange={e => setPassword1(e.target.value)}
          className='input-style2 mb-5'
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={password2}
          onChange={e => setPassword2(e.target.value)}
          className='input-style2 mb-5'
        />
        <button
          type='submit'
          className='bg-[#F5FBC3] text-[#1D3557] px-6 py-2 rounded-lg'>
          Confirm
        </button>
      </div>
    </form>
  )
}

export default ResetPassword
