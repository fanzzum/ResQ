import React, { useState, useEffect } from 'react'
import search from '../assets/icons/search.png'
import MissingCard from './MissingCard'
import MissingCardDetails from './MissingCardDetails'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PAGE_SIZE = 6

const ReportScreen = () => {
  const [allReports, setAllReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedReport, setSelectedReport] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    fetchAllReports()
    // eslint-disable-next-line
  }, [])

  const fetchAllReports = async () => {
    const token = localStorage.getItem('access')
    if (!token) {
      navigate('/login')
      return
    }
    setLoading(true)
    setError(null)
    try {
      let apiUrl = `https://xylem-api.ra-physics.space/administrator/missing-reports/`
      const response = await axios.get(apiUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      // If paginated, fetch all pages
      let results = response.data.results
      let next = response.data.next
      while (next) {
        const nextRes = await axios.get(next, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        results = results.concat(nextRes.data.results)
        next = nextRes.data.next
      }
      setAllReports(results)
      setLoading(false)
    } catch (err) {
      const status = err.response?.status
      const message = err.response?.data?.message || 'Failed to fetch reports'
      if (status === 401) {
        localStorage.removeItem('access')
        navigate('/login')
      }
      setError(message)
      setLoading(false)
    }
  }

  // Filter and paginate in frontend
  const filteredReports = allReports.filter(report => {
    // Only show if (scrapper & confidence > 0.5) OR approved:true
    const isScrapperWithConfidence =
      report.source === 'scrapper' &&
      Number(report.confidence_level) >= 0.5

    const isApproved = report.approved === true

    // Search term filter
    const term = searchTerm.toLowerCase()
    const matchesSearch =
      report.name?.toLowerCase().includes(term) ||
      report.last_seen_location?.toLowerCase().includes(term) ||
      report.reporter_name?.toLowerCase().includes(term)

    return (isScrapperWithConfidence || isApproved) && matchesSearch
  })

  const totalPages = Math.ceil(filteredReports.length / PAGE_SIZE)
  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  // Reset to page 1 if search/filter changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, allReports.length])

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
          {paginatedReports.map((report) => (
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
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="font-inter text-lg">
            Page {currentPage} {totalPages ? `/ ${totalPages}` : ''}
          </span>
          <button
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-bold disabled:opacity-50"
            onClick={handleNext}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedReport && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => setSelectedReport(null)}
        >
          <div
            className="bg-[#ffffff70] rounded-[57px] max-h-[75vh] overflow-y-auto scrollbar-none "
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
