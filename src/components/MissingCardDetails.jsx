import React from 'react'
import cam from '../assets/icons/cam.png'
import avatar from '../assets/icons/avatar.png'
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
    <div className="max-h-[100vh] overflow-hidden bg-[#94949495] rounded-[3.5rem] p-12 flex flex-col gap-10 max-w-4xl w-full font-inter">

      {/* Reporter Section */}
      <div className="flex gap-10 p-6">
        <img
          alt="reporter"
          src={photo_url1 || avatar}
          className="w-52 h-52 object-cover rounded-[30px] flex-shrink-0"
        />
        <div className="flex flex-col gap-3 flex-grow">
          <p className="font-[400] text-4xl">{name}</p>
          <p className="italic font-[200] text-lg">{formatDate(last_seen_datetime)}</p>
          <div className="grid grid-cols-[200px_16px_1fr] gap-x-2 gap-y-3 font-[400] text-lg items-center">
            <div>Approximate age</div><div>:</div><div>{age}</div>
            <div>Gender</div><div>:</div><div>{gender}</div>
            <div>Clothing</div><div>:</div><div>{clothing_description}</div>
            <div>Last Location</div><div>:</div><div>{last_seen_location}</div>
          </div>
        </div>
      </div>

      {/* Note */}
      <div className="flex font-poppins font-[400] gap-5 items-center">
        <p className="text-2xl flex-shrink-0">Note:</p>
        <input
          className="bg-white flex-grow h-10 rounded px-4 text-lg"
          value={note || ''}
          readOnly
        />
      </div>

      {/* Rescuer Info */}
      <p className="font-[500] text-2xl mt-6">Reporter’s Information</p>
      <div className="flex gap-10 p-6">
        <img
          alt="rescuer"
          src={avatar}
          className="w-32 h-32 object-cover rounded-full flex-shrink-0"
        />
        <div className="flex flex-col gap-2 flex-grow">
          <div className="grid grid-cols-[200px_16px_1fr] gap-x-2 gap-y-3 pt-4 font-[400] text-lg items-center">
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
