import React from 'react'

const MapList = ({ reports, onViewDetails, highlightedId }) => {
  if (!reports || reports.length === 0) {
    return (
      <div className="h-110 w-96 flex items-center justify-center text-white font-inter">
        No reports found.
      </div>
    )
  }

  return (
    <div className="h-110 w-96 overflow-y-scroll text-white scrollbar-thumb-[#343348] font-inter scrollbar-track-[#445167]">
      <div className="space-y-4 p-4">
        {reports.map((report) => (
          <div
            key={report.id}
            className={`p-2 bg-[#1C3253] rounded shadow transition-all duration-200 ${
              highlightedId === report.id ? 'ring-4 ring-blue-400 scale-105 z-10' : ''
            }`}
          >
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
