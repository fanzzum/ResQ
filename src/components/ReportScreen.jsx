import React, { useState, useEffect } from 'react'
import search from '../assets/icons/search.png'
import MissingCard from './MissingCard'
import MissingCardDetails from './MissingCardDetails'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import avatar from '../assets/icons/avatar.png'
const ReportScreen = () => {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedReport, setSelectedReport] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchReports = async () => {
      const token = localStorage.getItem('access')

      console.log('🔐 DEBUG: Access Token:', token)

      if (!token) {
        console.warn('🚫 No token found, redirecting to login')
        navigate('/login')
        return
      }

      try {
        const response = await axios.get(
          'https://xylem-api.ra-physics.space/administrator/missing-reports/',
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        )

        console.log('✅ DEBUG: API response:', response.data)

        setReports(response.data.results)
        setLoading(false)
      } catch (err) {
        const status = err.response?.status
        const message = err.response?.data?.message || 'Failed to fetch reports'

        console.error(`❌ API Error [${status}]:`, err.response?.data || err)

        if (status === 401) {
          localStorage.removeItem('access')
          console.warn('🔄 Token expired or invalid, redirecting to login')
          navigate('/login')
        } else if (status === 403) {
          console.warn('⛔ Forbidden: User lacks permission to access reports.')
        }

        setError(message)
        setLoading(false)
      }
    }

    fetchReports()
  }, [navigate])

  // Filter reports based on search term only (show all reports)
  const filteredReports = reports.filter(report => {
    const term = searchTerm.toLowerCase()
    return (
      report.name?.toLowerCase().includes(term) ||
      report.last_seen_location?.toLowerCase().includes(term) ||
      report.reporter_name?.toLowerCase().includes(term)
    )
  })

  if (loading) return <div className="text-center p-4">Loading...</div>
  if (error) return <div className="text-center text-red-500 p-4">Error: {error}</div>

  return (
    <div className='bg-white w-full h-full p-15 font-inter relative'>
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

      {/* Cards Grid */}
      <div className="container mx-auto m-5">
        <div className="grid grid-cols-2 gap-20">
          {filteredReports.map((report) => (
            <MissingCard
              key={report.id}
              {...report}
              onClick={() => setSelectedReport(report)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedReport && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => setSelectedReport(null)}
        >
          <div
            className="bg-[#ffffff70] rounded-[57px] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <MissingCardDetails data={selectedReport} />
          </div>
        </div>
      )}
    </div>
  )
}

export default ReportScreen
