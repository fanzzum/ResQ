import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import search from '../assets/icons/search.png'
import axios from 'axios'
import MapList from './MapList'

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

  if (loading) return <div className="text-center p-4">Loading map data...</div>
  if (error) return <div className="text-center text-red-500 p-4">Error: {error}</div>

  return (
    <div className="w-full h-screen flex flex-col font-inter relative">
      {/* Header */}
      <div className="w-full h-[90px] bg-[#2D5D7C] flex px-7 justify-between items-center z-10">
        <p className="font-[800] text-[40px] text-white">MAP VIEW</p>
        <div className="flex items-center relative">
          <input
            className="bg-[#9F9F9F] w-72 pl-12 h-11 rounded-[10px] placeholder:text-white placeholder:font-[400] placeholder:text-[18px]"
            placeholder="Search"
          />
          <img src={search} className="absolute left-3 top-2.5 w-6" alt="search icon" />
        </div>
      </div>

      {/* Map with absolute MapList on top */}
      <div className="flex-1 relative w-full h-full">
        <MapContainer
          center={markers.length ? markers[0].position : [23.8103, 90.4125]}
          zoom={7}
          className="w-full h-full z-0"
        >
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
          <MapList reports={reports} onViewDetails={handleViewDetails} />
        </div>
      </div>

      {/* Details Modal */}
      {selectedReport && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-transparent bg-opacity-40"
          onClick={handleCloseDetails}
        >
          <div
            className="  rounded-[3.5rem] p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
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
