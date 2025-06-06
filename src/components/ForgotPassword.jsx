import React, { useState } from 'react'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const baseURL = 'https://xylem-api.ra-physics.space' // change if needed

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) {
      alert("Enter an email.")
      return
    }

    try {
      setLoading(true)
      const res = await fetch(`${baseURL}/rest-auth/password/reset/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await res.json()
      if (res.ok) {
        alert(`Reset link sent to ${email}`)
      } else {
        alert(data?.email?.[0] || 'Something went wrong.')
      }
    } catch (err) {
      alert('Network error.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='w-260 h-176 bg-[#ffffff13] backdrop-blur-[4px] shadow-[-6px_6px_4px_3px_#00000025] m-20 rounded-[57px] flex flex-col items-center'>
        <p className='mt-20 font-poppins font-[600] text-[64px] text-transparent bg-clip-text bg-gradient-to-b from-[#173141] to-[#396C8B] inline-block h-[96px]'>
          Forgot Password
        </p>
        <div className='flex items-center p-10 mt-20'>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className='input-style2 font-poppins text-[20px] font-[275]'
          />
        </div>
        <button
          type='submit'
          disabled={loading}
          className='font-poppins text-[20px] font-[275] text-[#457B9D] bg-[#F5FBC3] w-50 h-12 rounded-[13px] flex justify-center items-center'
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </div>
    </form>
  )
}

export default ForgotPassword

