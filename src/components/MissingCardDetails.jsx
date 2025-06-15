import React from 'react'
import cam from '../assets/icons/cam.png'

const MissingCardDetails = ({ data }) => {
  if (!data) return null

  const {
    name,
    age,
    gender,
    clothing_description,
    last_seen_location,
    last_seen_datetime,
    photo_url1,
    reporter_name,
    reporter_contact,
    reporter_location,
    note,
  } = data

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))
    return diffInDays === 0 ? 'Reported today' : `Reported ${diffInDays} day(s) ago`
  }

  return (
    <div className='w-330 h-340 bg-[#B9B9B985] rounded-[57px] p-15 gap-20 font-inter flex flex-col'>
      {/* Reporter Section */}
      <div className='flex p-15 gap-8'>
        <img alt='reporter' src={photo_url1 || cam} className='w-81 h-81 object-cover rounded-full' />
        <div className='flex flex-col gap-3'>
          <p className='font-[400] text-[40px]'>{name}</p>
          <p className='italic font-[200]'>{formatDate(last_seen_datetime)}</p>
          <div className="grid grid-cols-[170px_8px_1fr] gap-x-2 gap-y-2 font-[400] text-[20px] items-center">
            <div>Approximate age</div><div>:</div><div>{age}</div>
            <div>Gender</div><div>:</div><div>{gender}</div>
            <div>Clothing</div><div>:</div><div>{clothing_description}</div>
            <div>Last Location</div><div>:</div><div>{last_seen_location}</div>
          </div>
        </div>
      </div>

      {/* Note */}
      <div className='flex font-poppins font-[400] gap-10'>
        <p className='text-[24px]'>Note:</p>
        <input className='bg-white w-245 h-25' value={note || ''} readOnly />
      </div>

      {/* Rescuer Info */}
      <p className='font-[500] text-[32px]'>Rescuer’s Information</p>
      <div className='flex p-15 gap-8'>
        <img alt='rescuer' src={cam} className='w-81 h-81 object-cover rounded-full' />
        <div className='flex flex-col gap-3'>
          <div className="grid grid-cols-[170px_8px_1fr] gap-x-2 gap-y-2 pt-15 font-[400] text-[20px] items-center">
            <div>Name</div><div>:</div><div>{reporter_name || 'Unknown'}</div>
            <div>Contact</div><div>:</div><div>{reporter_contact || 'Unknown'}</div>
            <div>Organization</div><div>:</div><div>{reporter_location || 'Unknown'}</div>
            <div>Found at</div><div>:</div><div>{last_seen_location}</div>
            <div>Time</div><div>:</div><div>{new Date(last_seen_datetime).toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MissingCardDetails
