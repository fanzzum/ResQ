import React, { useState } from 'react'
import cam from '../assets/icons/cam.png'

const IMGBB_URL = 'https://api.imgbb.com/1/upload'
const IMGBB_API_KEY = 'd4201688c3da225177b6b8ca11a3a624'

const MissingReport = () => {
  const [formData, setFormData] = useState({
    reporter_name: '',
    reporter_contact: '',
    reporter_location: '',
    note: '',
    name: '',
    age: '',
    gender: '',
    clothing_description: '',
    last_seen_location: '',
    last_seen_datetime_date: '',
    last_seen_datetime_time: '',
    photo_url1: null,
    photo_url2: null,
    photo_url3: null,
  })

  const [previewUrls, setPreviewUrls] = useState({
    photo_url1: null,
    photo_url2: null,
    photo_url3: null,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePhotoChange = (e) => {
    const { name, files } = e.target
    if (files && files[0]) {
      const file = files[0]
      const previewUrl = URL.createObjectURL(file)
      setPreviewUrls((prev) => ({ ...prev, [name]: previewUrl }))
      setFormData((prev) => ({ ...prev, [name]: file }))
    }
  }

  const uploadToImgBB = async (file) => {
    const formData = new FormData()
    formData.append('image', file)
    formData.append('key', IMGBB_API_KEY)

    const res = await fetch(IMGBB_URL, {
      method: 'POST',
      body: formData,
    })

    const data = await res.json()
    if (!data.success) throw new Error('ImgBB upload failed')
    return data.data.url
  }

  const handleSubmit = async () => {
    try {
      const uploadedUrls = {}
      for (const key of ['photo_url1', 'photo_url2', 'photo_url3']) {
        if (formData[key]) {
          const url = await uploadToImgBB(formData[key])
          uploadedUrls[key] = url
        } else {
          uploadedUrls[key] = ''
        }
      }

      const payload = {
        reporter_name: formData.reporter_name,
        reporter_contact: formData.reporter_contact,
        reporter_location: formData.reporter_location,
        note: formData.note,
        name: formData.name,
        age: formData.age,
        gender: formData.gender,
        clothing_description: formData.clothing_description,
        last_seen_location: formData.last_seen_location,
        last_seen_datetime: new Date(
          formData.last_seen_datetime_date + 'T' + formData.last_seen_datetime_time
        ).toISOString(),
        photo_url1: uploadedUrls.photo_url1,
        photo_url2: uploadedUrls.photo_url2,
        photo_url3: uploadedUrls.photo_url3,
      }

      const res = await fetch('https://xylem-api.ra-physics.space/administrator/missing-reports/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = await res.json()
      if (!res.ok) throw new Error(result.message || 'Submission failed')
      alert('Report submitted successfully')
    } catch (err) {
      alert('Error: ' + err.message)
    }
  }

  return (
    <div className='flex justify-center w-[1286px] h-[1600px] rounded-[38px] bg-[#e8e8e8] pt-10 overflow-y-auto' style={{ boxShadow: 'inset -6px -7px 4px 0px #00000040' }}>
      <div className='flex flex-col flex-1 p-10 gap-8'>
        <p className='font-[700] text-[32px] font-poppins text-[#807B7B]'>BASIC INFORMATION</p>
        <div className='font-[300] text-[24px] font-poppins flex flex-col gap-5'>
          <p>Your name</p>
          <input name='reporter_name' value={formData.reporter_name} onChange={handleChange} className='input-style' />
          <p>Your Mobile Number</p>
          <input name='reporter_contact' value={formData.reporter_contact} onChange={handleChange} className='input-style' />
          <p>Your Location</p>
          <input name='reporter_location' value={formData.reporter_location} onChange={handleChange} className='input-style' />
          <p>Additional Note</p>
          <textarea name='note' value={formData.note} onChange={handleChange} className='input-style h-85 resize-y p-2' rows={5} />
        </div>
      </div>

      <div className='flex flex-col flex-1 p-10 gap-8'>
        <p className='font-[700] text-[32px] font-poppins text-[#807B7B]'>MISSING PERSON INFORMATION</p>
        <div className='font-[300] text-[24px] font-poppins flex flex-col gap-5'>
          <p>Name</p>
          <input name='name' value={formData.name} onChange={handleChange} className='input-style' />
          <p>Age</p>
          <input name='age' type='number' value={formData.age} onChange={handleChange} className='input-style' />
          <p>Gender</p>
          <input name='gender' value={formData.gender} onChange={handleChange} className='input-style' />
          <p>Clothing</p>
          <input name='clothing_description' value={formData.clothing_description} onChange={handleChange} className='input-style' />
          <p>Last Location</p>
          <input name='last_seen_location' value={formData.last_seen_location} onChange={handleChange} className='input-style' />
          <p>Last Seen Date</p>
          <input type='date' name='last_seen_datetime_date' value={formData.last_seen_datetime_date} onChange={handleChange} className='input-style' />
          <p>Last Seen Time</p>
          <input type='time' name='last_seen_datetime_time' value={formData.last_seen_datetime_time} onChange={handleChange} className='input-style' />

          {[1, 2, 3].map((num) => (
            <div key={num} className='flex items-center gap-4 max-w-full'>
              <label htmlFor={`photo_url${num}`} className='bg-white w-48 h-12 rounded-[13px] flex items-center gap-5 p-3 cursor-pointer flex-shrink-0'>
                <img src={cam} alt='camera' className='w-7' />
                <p>Add Photo</p>
              </label>
              <input id={`photo_url${num}`} type='file' accept='image/*' name={`photo_url${num}`} onChange={handlePhotoChange} className='hidden' />
              {previewUrls[`photo_url${num}`] && (
                <img
                  src={previewUrls[`photo_url${num}`]}
                  alt={`Preview ${num}`}
                  className='w-40 h-40 object-cover rounded max-w-full flex-shrink-0'
                  style={{ maxWidth: '160px' }}
                />
              )}
            </div>
          ))}

          <button onClick={handleSubmit} className='w-50 h-17 bg-[linear-gradient(0deg,#274659,#000000,#10222C)] text-white font-inter font-[500] text-[28px] rounded-[8px] ml-90 mt-6'>
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  )
}

export default MissingReport
