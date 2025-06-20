import React from 'react'

const dummyReports = [
  { id: 1, name: 'Rahim Khan', age: 20, time: '10:10 am', reportedAgo: '3 hours ago' },
  { id: 2, name: 'Salina Jahan', age: 40, time: '11:00 am', reportedAgo: '4 hours ago' },
  { id: 3, name: 'Rafsun Navid', age: 24, time: '9:00 pm', reportedAgo: '5 hours ago' },
  { id: 4, name: 'Farhan Ahmed', age: 25, time: '8:00 am', reportedAgo: '5 hours ago' },
  { id: 5, name: 'Rahim Khan', age: 20, time: '10:10 am', reportedAgo: '3 hours ago' },
  { id: 6, name: 'Rafsun Navid', age: 24, time: '9:00 pm', reportedAgo: '5 hours ago' },
]

const MapList = () => {
  return (
    <div className="w-96 h-full overflow-y-scroll bg-white bg-opacity-90 backdrop-blur-sm p-4 scrollbar-thin scrollbar-thumb-gray-400">
      {dummyReports.map((report) => (
        <div key={report.id} className="bg-[#173F69] text-white p-4 mb-4 rounded-md shadow">
          <p className="text-lg font-semibold">{report.name}</p>
          <p className="text-sm italic text-gray-200">Reported {report.reportedAgo}</p>
          <p className="text-sm mt-1">Age :{report.age}, Last seen at {report.time}</p>
          <p className="text-sm text-right text-gray-300 italic mt-2">View details</p>
        </div>
      ))}
    </div>
  )
}

export default MapList
