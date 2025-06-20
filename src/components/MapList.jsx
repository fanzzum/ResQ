import React from 'react'

const MapList = ({ reports, onViewDetails }) => {
  // Use dummy data if no reports are passed
  const items = reports && reports.length > 0
    ? reports
    : Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        name: `Item ${i + 1}`,
        reporter_name: 'Unknown',
        age: 20 + (i % 10),
        last_seen_location: 'Somewhere',
      }))

  return (
    <div className="h-64 w-96 overflow-y-scroll  text-white scrollbar-thumb-[#343348] font-inter scrollbar-track-[#445167]">
      <div className="space-y-4 p-4">
        {items.map((report, i) => (
          <div key={report.id || i} className="p-2 bg-[#1C3253] rounded shadow">
            <p className="text-lg font-[400]">{report.name}</p>
            <p className="text-sm font-[200] italic">Reported by {report.reporter_name || 'Unknown'}</p>
            <p className="text-sm font-[300] mt-1">Age: {report.age}, Last seen at {report.last_seen_location}</p>
            <p
              className="text-sm font-[200] underline text-right italic mt-2 cursor-pointer"
              onClick={() => onViewDetails && onViewDetails(report)}
            >
              View details
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MapList
