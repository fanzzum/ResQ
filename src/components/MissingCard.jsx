import React from 'react'
import cam from '../assets/icons/cam.png'
import avatar from '../assets/icons/avatar.png'
const MissingCard = ({
  name,
  age,
  gender,
  clothing_description,
  last_seen_location,
  last_seen_datetime,
  photo_url1,
  confidence_level,
  onClick, // for "View Details"
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))
    return diffInDays === 0 ? 'Reported today' : `Reported ${diffInDays} day(s) ago`
  }

  // Format confidence as percentage or fallback
  let confidenceText = ''
  if (confidence_level !== null && confidence_level !== undefined && confidence_level !== '') {
    let conf = Number(confidence_level)
    // If confidence is > 1, assume it's already a percent (like 100.00)
    if (conf > 1) conf = Math.round(conf)
    else conf = Math.round(conf * 100)
    confidenceText = `${conf}% confidence`
  }

  return (
    <div className="flex p-15 gap-14 font-inter bg-[#D9D9D9] w-162 h-fit rounded-[10px] shadow-md">
      <img
        alt="Missing Person"
        src={photo_url1 || avatar}
        className="w-42 h-48 object-cover rounded-[10px]"
      />

      <div className="flex flex-col gap-3">
        <p className="font-[400] text-[32px]">{name}</p>
        <p className="italic font-[200] text-[13px]">{formatDate(last_seen_datetime)}</p>

        <div className="grid grid-cols-[200px_8px_1fr] gap-x-2 gap-y-2 font-[400] text-[16px] items-center">
          <div className="text-left">Approximate age</div>
          <div className="text-right">:</div>
          <div>{age}</div>

          <div className="text-left">Gender</div>
          <div className="text-right">:</div>
          <div>{gender}</div>

          <div className="text-left">Clothing</div>
          <div className="text-right">:</div>
          <div>{clothing_description}</div>

          <div className="text-left">Last Location</div>
          <div className="text-right">:</div>
          <div>{last_seen_location}</div>

          <div>{confidenceText}</div>
          <button
            className="font-[200] italic text-[13px] underline"
            onClick={onClick}
          >
            View details
          </button>
        </div>
      </div>
    </div>
  )
}

export default MissingCard


