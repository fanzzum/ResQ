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
    <div className="bg-[#94949495] rounded-[3.5rem] p-6 flex flex-col gap-5 max-w-md w-full max-h-[90vh] overflow-y-auto font-inter">
      {/* Reporter Section */}
      <div className="flex gap-4 p-4">
        <img
          alt="reporter"
          src={photo_url1 || cam}
          className="w-30 h-30 object-cover rounded-[20px] flex-shrink-0"
        />
        <div className="flex flex-col gap-1 flex-grow">
          <p className="font-[400] text-2xl">{name}</p>
          <p className="italic font-[200] text-sm">{formatDate(last_seen_datetime)}</p>
          <div className="grid grid-cols-[5fr_1fr_6fr] gap-x-1 gap-y-1 font-[400] text-sm items-center">
            <div>Approximate age</div><div>:</div><div>{age}</div>
            <div>Gender</div><div>:</div><div>{gender}</div>
            <div>Clothing</div><div>:</div><div>{clothing_description}</div>
            <div>Last Location</div><div>:</div><div>{last_seen_location}</div>
          </div>
        </div>
      </div>

      {/* Note */}
      <div className="flex font-poppins font-[400] gap-3 items-center">
        <p className="text-lg flex-shrink-0">Note:</p>
        <input
          className="bg-white flex-grow h-6 rounded px-2"
          value={note || ''}
          readOnly
        />
      </div>

      {/* Rescuer Info */}
      <p className="font-[500] text-xl mt-4">Rescuer’s Information</p>
      <div className="flex gap-4 p-4">
        <img
          alt="rescuer"
          src={cam}
          className="w-20 h-20 object-cover rounded-full flex-shrink-0"
        />
        <div className="flex flex-col gap-1 flex-grow">
          <div className="grid grid-cols-[5fr_1fr_6fr] gap-x-1 gap-y-1 pt-4 font-[400] text-sm items-center">
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
