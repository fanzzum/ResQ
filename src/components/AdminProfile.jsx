import React, { useEffect, useState } from 'react'
import avatar from '../assets/icons/avatar.png'
import search from '../assets/icons/search.png'
import axios from 'axios'
import MissingCard from './MissingCard'
import MissingCardAdmin from './MissingCardAdmin'
import MissingCardDetails from './MissingCardDetails'

const AdminProfile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
  })
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedReport, setSelectedReport] = useState(null)

  useEffect(() => {
    // Get user info from localStorage
    const userInfo = JSON.parse(localStorage.getItem('user'))
    const role = localStorage.getItem('role')
    if (userInfo) {
      setUser({
        name: userInfo.first_name || userInfo.username || '',
        email: userInfo.email || '',
        phone: userInfo.phone || '',
        role: role ? role.toUpperCase() : '',
      })
    }
    // Fetch reports
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('access')
        if (!token) return
        const response = await axios.get(
          'https://xylem-api.ra-physics.space/administrator/missing-reports/',
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        )
        setReports(response.data.results)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch reports')
        setLoading(false)
      }
    }
    fetchReports()
  }, [])

  // Accept handler
  const handleAccept = async (report) => {
    try {
      const token = localStorage.getItem('access')
      // Build the payload as required by the API, set approved: true and confidence_level: 100
      const updatedReport = {
        name: report.name,
        age: report.age,
        gender: report.gender,
        clothing_description: report.clothing_description,
        last_seen_location: report.last_seen_location,
        last_seen_datetime: report.last_seen_datetime,
        photo_url1: report.photo_url1,
        photo_url2: report.photo_url2,
        photo_url3: report.photo_url3,
        reporter_name: report.reporter_name,
        reporter_contact: report.reporter_contact,
        reporter_location: report.reporter_location,
        note: report.note,
        approved: true,
        confidence_level: 100,
      }
      await axios.put(
        `https://xylem-api.ra-physics.space/administrator/missing-reports/?id=${report.id}`,
        updatedReport,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      setReports(prev =>
        prev.map(r =>
          r.id === report.id
            ? { ...r, approved: true, confidence_level: 100 }
            : r
        )
      )
    } catch (err) {
      alert('Failed to approve report')
    }
  }

  // Decline handler
  const handleDecline = (report) => {
    setReports(prev => prev.filter(r => r.id !== report.id))
  }

  // Filter reports based on search term and exclude approved ones
  const filteredReports = reports.filter((report) => {
    if (report.approved === true) return false // Exclude approved reports
    const term = searchTerm.toLowerCase()
    return (
      report.name?.toLowerCase().includes(term) ||
      report.last_seen_location?.toLowerCase().includes(term) ||
      report.reporter_name?.toLowerCase().includes(term)
    )
  })

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
        <div className='flex items-center relative'>
          <input
            className='bg-[#9F9F9F] w-74 pl-13 h-12 rounded-[10px] placeholder:text-white placeholder:font-[400] placeholder:text-[24px]'
            placeholder='search'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <img src={search} className='absolute left-4 w-7' alt="Search" />
        </div>
      </div>

      {/* Reports Grid */}
      <div className="container mx-auto m-5">
        {loading ? (
          <div className="text-center p-4">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 p-4">{error}</div>
        ) : (
          <div className="grid grid-cols-2 gap-20">
            {filteredReports.map((report) =>
              report.source === 'scrapper' && Number(report.confidence_level) >= 0 ? (
                <MissingCard
                  key={report.id}
                  {...report}
                  onClick={() => setSelectedReport(report)}
                />
              ) : (
                <MissingCardAdmin
                  key={report.id}
                  {...report}
                  onClick={() => setSelectedReport(report)}
                  onAccept={() => handleAccept(report)}
                  onDecline={() => handleDecline(report)}
                />
              )
            )}
          </div>
        )}
      </div>
      {/* Modal for details */}
      {selectedReport && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => setSelectedReport(null)}
        >
          <div
            className="bg-[#ffffff70] rounded-[57px] max-h-[75vh] overflow-y-auto scrollbar-none"
            onClick={e => e.stopPropagation()}
          >
            <MissingCardDetails data={selectedReport} />
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminProfile