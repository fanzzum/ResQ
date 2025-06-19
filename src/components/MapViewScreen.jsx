import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import search from '../assets/icons/search.png'
import axios from 'axios'

const icon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [32, 32],
})

const MapViewScreen = () => {
  const [reports, setReports] = useState([])
  const [markers, setMarkers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchReportsAndGeocode = async () => {
      try {
        const token = localStorage.getItem('access')
        if (!token) throw new Error('No auth token')

        // Fetch reports
        const response = await axios.get(
          'https://xylem-api.ra-physics.space/administrator/missing-reports/',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )

        const reportsData = response.data.results
        setReports(reportsData)

        // Geocode addresses to get lat/lng for markers
        const geocodedMarkers = await Promise.all(
          reportsData.map(async (report) => {
            const address = report.address || report.location || report.label || ''
            if (!address) return null

            // Use OpenStreetMap Nominatim API for geocoding (English)
            const geoRes = await fetch(
              `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
            )
            const geoData = await geoRes.json()

            if (geoData.length === 0) return null

            return {
              id: report.id,
              position: [parseFloat(geoData[0].lat), parseFloat(geoData[0].lon)],
              label: report.name || report.label || address,
            }
          })
        )

        setMarkers(geocodedMarkers.filter((m) => m !== null))
        setLoading(false)
      } catch (err) {
        setError(err.message || 'Failed to load or geocode reports')
        setLoading(false)
      }
    }

    fetchReportsAndGeocode()
  }, [])

  if (loading) return <div className="text-center p-4">Loading map data...</div>
  if (error) return <div className="text-center text-red-500 p-4">Error: {error}</div>

  return (
    <div className="w-full h-screen flex flex-col font-inter">
      {/* Header */}
      <div className="w-full h-[90px] bg-[#2D5D7C] flex px-7 justify-between items-center">
        <p className="font-[800] text-[40px] text-white">MAP VIEW</p>
        <div className="flex items-center relative">
          <input
            className="bg-[#9F9F9F] w-72 pl-12 h-11 rounded-[10px] placeholder:text-white placeholder:font-[400] placeholder:text-[18px]"
            placeholder="Search"
          />
          <img src={search} className="absolute left-3 top-2.5 w-6" alt="search icon" />
        </div>
      </div>

      {/* Map */}
      <div className="flex-1">
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
      </div>
    </div>
  )
}

export default MapViewScreen
