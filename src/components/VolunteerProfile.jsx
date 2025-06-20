import React, { useEffect, useState } from 'react'
import avatar from '../assets/icons/avatar.png'
import axios from 'axios'
import graph from '../assets/pictures/graph.png'
import MissingCard from './MissingCard'
import MissingCardDetails from './MissingCardDetails'

const VolunteerProfile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    role: '',
  })
  const [showEdit, setShowEdit] = useState(false)
  const [editData, setEditData] = useState({
    name: '',
    phone: '',
    address: '',
  })
  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  // For volunteer's missing reports
  const [reports, setReports] = useState([])
  const [reportsLoading, setReportsLoading] = useState(true)
  const [reportsError, setReportsError] = useState(null)
  const [selectedReport, setSelectedReport] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [nextPage, setNextPage] = useState(null)
  const [prevPage, setPrevPage] = useState(null)
  const [count, setCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    // Get user info from localStorage
    const userInfo = JSON.parse(localStorage.getItem('user'))
    const role = localStorage.getItem('role')
    if (userInfo) {
      setUser({
        name: userInfo.first_name || userInfo.username || '',
        email: userInfo.email || '',
        phone: userInfo.phone || '',
        address: userInfo.address || '',
        role: role ? role.toUpperCase() : '',
      })
    }
  }, [])

  // Fetch volunteer's missing reports
  const fetchReports = async (url = null, page = 1) => {
    setReportsLoading(true)
    setReportsError(null)
    try {
      const token = localStorage.getItem('access')
      const userInfo = JSON.parse(localStorage.getItem('user'))
      if (!token || !userInfo) {
        setReportsError('Not logged in')
        setReportsLoading(false)
        return
      }
      const payload = {
        name: userInfo.first_name || userInfo.username || '',
        phone: userInfo.phone || '',
        address: userInfo.address || '',
        latitude: userInfo.latitude || 0,
        longitude: userInfo.longitude || 0,
      }
      let apiUrl =
        url ||
        `https://xylem-api.ra-physics.space/volunteer/reports/?p=${page}`
      const response = await axios.post(apiUrl, payload, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      setReports(response.data.results)
      setNextPage(response.data.next)
      setPrevPage(response.data.previous)
      setCount(response.data.count)
      setCurrentPage(page)
      setReportsLoading(false)
    } catch (err) {
      setReportsError('Failed to fetch reports')
      setReportsLoading(false)
    }
  }

  useEffect(() => {
    fetchReports(null, 1)
  }, [])

  const handleEditOpen = () => {
    setEditData({
      name: user.name,
      phone: user.phone,
      address: user.address,
    })
    setShowEdit(true)
    setSuccessMsg('')
    setErrorMsg('')
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccessMsg('')
    setErrorMsg('')
    try {
      const token = localStorage.getItem('access')
      const payload = {
        name: editData.name,
        phone: editData.phone,
        address: editData.address,
      }
      await axios.put(
        'https://xylem-api.ra-physics.space/volunteer/profile/',
        payload,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      setUser(prev => ({
        ...prev,
        ...payload,
      }))
      setSuccessMsg('Profile updated successfully!')
      setShowEdit(false)
      // Optionally update localStorage
      const userInfo = JSON.parse(localStorage.getItem('user')) || {}
      localStorage.setItem('user', JSON.stringify({ ...userInfo, ...payload }))
    } catch (err) {
      setErrorMsg('Failed to update profile.')
    }
    setLoading(false)
  }

  // Pagination controls for reports
  const handleNext = () => {
    if (nextPage) fetchReports(nextPage, currentPage + 1)
  }
  const handlePrev = () => {
    if (prevPage) fetchReports(prevPage, currentPage - 1)
  }

  // Filter reports by search term
  const filteredReports = reports.filter(report => {
    const term = searchTerm.toLowerCase()
    return (
      report.name?.toLowerCase().includes(term) ||
      report.last_seen_location?.toLowerCase().includes(term) ||
      report.reporter_name?.toLowerCase().includes(term)
    )
  })

  return (
    <div className='w-full h-full bg-white p-15 gap-10 flex flex-col font-inter items-center'>
      <p className='font-[800] text-[60px] text-transparent bg-clip-text bg-gradient-to-r from-[#7A6969] to-[#E0C0C0] inline-block'>PROFILE</p>

      <div className='flex bg-[#6e636325] gap-20 p-13 rounded-[15px]'>
        <img src={avatar} className='w-2/7' alt="avatar"/>
        <div className='flex flex-col pl-5'>
          <p className='font-[600] text-[48px]'>Welcome back</p>
          <p className='font-[400] text-[48px]'>{user.name}!</p>
          <div className='flex justify-between gap-70'>
            <div className='flex flex-col'>
              <p className='font-[500] text-[20px]'>{user.email}</p>
              <p className='font-[500] text-[20px]'>{user.phone || '+8801555555555'}</p>
              <p className='font-[500] text-[20px]'><span className='font-bold inline'>Organization :</span> Red Cresent</p>
              <p className='font-[500] text-[20px]'><span className='font-bold inline'>Address :</span> {user.address || '3/16, Bhuter Goli, Mirpur'}</p>
            </div>
            <div className='flex flex-col'>
              <p className='font-[500] text-[20px]'><span className='font-bold inline'>Blood Group :</span> O+ve</p>
            </div>
          </div>
          <div className='flex justify-between'>
            <p className='font-[200] text-[20px] italic'>Joined Date : 1st June, 2025</p>
            <button
              className='flex items-center text-white pt-2 pb-2 pl-3 pr-3 rounded-[8px] justify-center bg-[linear-gradient(180deg,#165179,#2E5E7F,#5F8BA7)]'
              onClick={handleEditOpen}
            >
              EDIT
            </button>
          </div>
          {successMsg && <p className="text-green-600 mt-2">{successMsg}</p>}
          {errorMsg && <p className="text-red-600 mt-2">{errorMsg}</p>}
        </div>
        <div></div>
      </div>

      {/* Edit Modal */}
      {showEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-30" onClick={() => setShowEdit(false)}>
          <form
            className="bg-white rounded-[30px] shadow-lg p-10 w-full max-w-md flex flex-col gap-5"
            onClick={e => e.stopPropagation()}
            onSubmit={handleEditSubmit}
          >
            <p className="text-2xl font-bold text-[#2D5D7C] mb-2">Edit Profile</p>
            <label className="flex flex-col font-[500] text-[18px]">
              Name
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleEditChange}
                className="mt-1 p-2 rounded border border-gray-300"
                required
              />
            </label>
            <label className="flex flex-col font-[500] text-[18px]">
              Phone
              <input
                type="text"
                name="phone"
                value={editData.phone}
                onChange={handleEditChange}
                className="mt-1 p-2 rounded border border-gray-300"
                required
              />
            </label>
            <label className="flex flex-col font-[500] text-[18px]">
              Address
              <input
                type="text"
                name="address"
                value={editData.address}
                onChange={handleEditChange}
                className="mt-1 p-2 rounded border border-gray-300"
                required
              />
            </label>
            <div className="flex justify-end gap-4 mt-4">
              <button
                type="button"
                className="px-4 py-2 rounded bg-gray-300 text-gray-700 font-bold"
                onClick={() => setShowEdit(false)}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-[#2D5D7C] text-white font-bold flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v16a8 8 0 01-8-8z"
                      />
                    </svg>
                    Updating...
                  </>
                ) : (
                  'Update'
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      <img src={graph} className='w-3/5 p-10 h-auto'/>

      {/* Volunteer Missing Reports Section */}
      <div className="w-full max-w-6xl mt-10">
        <div className="flex items-center justify-between mb-6">
          <p className="font-[700] text-[36px] text-[#2D5D7C]">Your Missing Reports</p>
          <div className='flex items-center relative'>
            <input
              className='bg-[#9F9F9F] w-72 pl-12 h-11 rounded-[10px] placeholder:text-white placeholder:font-[400] placeholder:text-[18px]'
              placeholder='Search'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        {reportsLoading ? (
          <div className="text-center p-4">Loading reports...</div>
        ) : reportsError ? (
          <div className="text-center text-red-500 p-4">{reportsError}</div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-20">
              {filteredReports.map((report) => (
                <MissingCard
                  key={report.id}
                  {...report}
                  onClick={() => setSelectedReport(report)}
                />
              ))}
            </div>
            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-bold disabled:opacity-50"
                onClick={handlePrev}
                disabled={!prevPage}
              >
                Previous
              </button>
              <span className="font-inter text-lg">
                Page {currentPage} {count ? `/ ${Math.ceil(count / (reports.length || 1))}` : ''}
              </span>
              <button
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-bold disabled:opacity-50"
                onClick={handleNext}
                disabled={!nextPage}
              >
                Next
              </button>
            </div>
          </>
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

export default VolunteerProfile