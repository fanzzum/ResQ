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

        console.log('🛠️ Access token found, requesting reports...')

        const response = await axios.get(
          'https://xylem-api.ra-physics.space/administrator/missing-reports/',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )

        const reportsData = response.data.results
        setReports(reportsData)
        console.log('📦 Reports fetched:', reportsData)

        const geocodedMarkers = await Promise.all(
          reportsData.map(async (report) => {
            // Use last_seen_location as the address
            const address = report.last_seen_location || report.address || report.location || report.label || ''
            if (!address) {
              console.warn(`⚠️ Report with id ${report.id} has no valid address.`)
              return null
            }

            console.log(`🌍 Geocoding address: ${address}`)

            const geoRes = await fetch(
              `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
            )
            const geoData = await geoRes.json()

            if (geoData.length === 0) {
              console.warn(`❌ Geocoding failed for: ${address}`)
              return null
            }

            const lat = parseFloat(geoData[0].lat)
            const lon = parseFloat(geoData[0].lon)

            console.log(`✅ Geocoded "${address}" to:`, { lat, lon })

            return {
              id: report.id,
              position: [lat, lon],
              label: report.name || report.label || address,
            }
          })
        )

        const validMarkers = geocodedMarkers.filter((m) => m !== null)
        setMarkers(validMarkers)
        console.log('📍 Final markers:', validMarkers)

        setLoading(false)
      } catch (err) {
        console.error('💥 Failed to load or geocode reports:', err)
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
