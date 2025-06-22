import React, { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import search from '../assets/icons/search.png'
import axios from 'axios'
import MapList from './MapList'
import MissingCardDetails from './MissingCardDetails'

const icon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [32, 32],
})

const MapViewScreen = () => {
  const [reports, setReports] = useState([])
  const [markers, setMarkers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedReport, setSelectedReport] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [highlightedId, setHighlightedId] = useState(null)
  const mapRef = useRef(null)

  useEffect(() => {
    const fetchReportsAndGeocode = async () => {
      try {
        const token = localStorage.getItem('access')
        if (!token) throw new Error('No auth token')

        const response = await axios.get(
          'https://xylem-api.ra-physics.space/administrator/missing-reports/',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )

        const reportsData = response.data.results
        setReports(reportsData)

        const geocodedMarkers = await Promise.all(
          reportsData.map(async (report) => {
            const address = report.last_seen_location || report.address || report.location || report.label || ''
            if (!address) return null

            const geoRes = await fetch(
              `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
            )
            const geoData = await geoRes.json()
            if (geoData.length === 0) return null

            const lat = parseFloat(geoData[0].lat)
            const lon = parseFloat(geoData[0].lon)
            return {
              id: report.id,
              position: [lat, lon],
              label: report.name || report.label || address,
              report,
            }
          })
        )

        const validMarkers = geocodedMarkers.filter((m) => m !== null)
        setMarkers(validMarkers)
        setLoading(false)
      } catch (err) {
        setError(err.message || 'Failed to load or geocode reports')
        setLoading(false)
      }
    }

    fetchReportsAndGeocode()
  }, [])

  // Handler for MapList "View details"
  const handleViewDetails = (report) => {
    setSelectedReport(report)
  }

  // Handler to close details modal
  const handleCloseDetails = () => {
    setSelectedReport(null)
  }

  // Filtered reports for search
  const filteredReports = React.useMemo(() => {
    if (!searchTerm) return reports
    const term = searchTerm.toLowerCase()
    // Find all matches, but put the best match at the top
    const matches = reports.filter(
      r =>
        r.name?.toLowerCase().includes(term) ||
        r.last_seen_location?.toLowerCase().includes(term) ||
        r.reporter_name?.toLowerCase().includes(term)
    )
    if (matches.length === 0) return reports
    // Move the first match to the top
    const firstMatch = matches[0]
    return [firstMatch, ...reports.filter(r => r.id !== firstMatch.id)]
  }, [reports, searchTerm])

  // When search is submitted, fly to marker and highlight in list
  const handleSearch = (e) => {
    e.preventDefault()
    if (!searchTerm) return
    const term = searchTerm.toLowerCase()
    const match = markers.find(
      m =>
        m.report.name?.toLowerCase().includes(term) ||
        m.report.last_seen_location?.toLowerCase().includes(term) ||
        m.report.reporter_name?.toLowerCase().includes(term)
    )
    if (match && mapRef.current) {
      mapRef.current.flyTo(match.position, 14, { duration: 1.5 })
      setHighlightedId(match.id)
      // Optionally, scroll MapList to top (handled by putting match at top)
    } else {
      setHighlightedId(null)
    }
  }

  // For MapContainer ref
  function SetMapRef() {
    const map = useMap()
    useEffect(() => {
      mapRef.current = map
    }, [map])
    return null
  }

  if (loading) return <div className="text-center p-4">Loading map data...</div>
  if (error) return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-red-100 border border-red-400 text-red-700 px-8 py-6 rounded-lg shadow-lg font-inter text-xl flex items-center gap-4">
        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
        </svg>
        <span>Map is currently under maintenance</span>
      </div>
    </div>
  )

  return (
    <div className="w-full h-screen flex flex-col font-inter relative">
      {/* Header */}
      <div className="w-full h-[90px] bg-[#2D5D7C] flex px-7 justify-between items-center z-10">
        <p className="font-[800] text-[40px] text-white">MAP VIEW</p>
        <form className="flex items-center relative" onSubmit={handleSearch}>
          <input
            className="bg-[#9F9F9F] w-72 pl-12 h-11 rounded-[10px] placeholder:text-white placeholder:font-[400] placeholder:text-[18px]"
            placeholder="Search"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <img src={search} className="absolute left-3 top-2.5 w-6" alt="search icon" />
        </form>
      </div>

      {/* Map with absolute MapList on top */}
      <div className="flex-1 relative w-full h-full">
        <MapContainer
          center={markers.length ? markers[0].position : [23.8103, 90.4125]}
          zoom={7}
          className="w-full h-full z-0"
        >
          <SetMapRef />
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          />
          {markers.map(({ id, position, label }) => (
            <Marker key={id} position={position} icon={icon}>
              <Popup>{label}</Popup>
            </Marker>
          ))}
        </MapContainer>
        {/* Absolute MapList */}
        <div className="absolute top-8 right-8 w-96 max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 z-20 bg-transparent bg-opacity-90 rounded-lg shadow-lg">
          <MapList
            reports={filteredReports}
            onViewDetails={handleViewDetails}
            highlightedId={highlightedId}
          />
        </div>
      </div>

      {/* Details Modal */}
      {selectedReport && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-transparent bg-opacity-40"
          onClick={handleCloseDetails}
        >
          <div
            className="rounded-[3.5rem] p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-6 left-6 text-3xl font-bold text-gray-700 bg-white bg-opacity-70 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-100 transition"
              onClick={handleCloseDetails}
              aria-label="Close details"
            >
              ×
            </button>
            <MissingCardDetails data={selectedReport} />
          </div>
        </div>
      )}
    </div>
  )
}

export default MapViewScreen
