import React, { useState, useEffect } from 'react'
import search from '../assets/icons/search.png'
import MissingCard from './MissingCard'
import MissingCardDetails from './MissingCardDetails'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ReportScreen = () => {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedReport, setSelectedReport] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('access')
        if (!token) {
          navigate('/login')
          return
        }

        const response = await axios.get(
          'https://xylem-api.ra-physics.space/administrator/missing-reports/',
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        )
        setReports(response.data.results)
        setLoading(false)
      } catch (err) {
        console.error('API Error:', err.response || err)
        setError(err.response?.data?.detail || 'Failed to fetch reports')
        setLoading(false)

        if (err.response?.status === 401) {
          localStorage.removeItem('access')
          navigate('/login')
        }
      }
    }

    fetchReports()
  }, [navigate])

  if (loading) return <div className="text-center p-4">Loading...</div>
  if (error) return <div className="text-center text-red-500 p-4">Error: {error}</div>

  return (
    <div className='bg-white w-full h-full p-15 font-inter relative'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <p className='text-transparent bg-clip-text bg-gradient-to-r from-[#7A6969] to-[#E0C0C0] inline-block font-[700] text-[60px]'>MISSING REPORTS</p>
        <div className='flex items-center'>
          <input className='bg-[#9F9F9F] w-74 pl-13 h-12 rounded-[10px] placeholder:text-white placeholder:font-[400] placeholder:text-[24px]' placeholder='search' />
          <img src={search} className='absolute ml-4 w-7' />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="container mx-auto m-5">
        <div className="grid grid-cols-2 gap-20">
          {reports.map((report) => (
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
          className="fixed inset-0  z-50 flex items-center justify-center"
          onClick={() => setSelectedReport(null)}
        >
          <div
            className="bg-white p-6 rounded-2xl max-h-[90vh] overflow-y-auto"
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
