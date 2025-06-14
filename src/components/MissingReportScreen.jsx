import React from 'react'
import MissingReport from './MissingReport'
const MissingReportScreen = () => {
  return (
    <div className='flex flex-col items-center bg-white gap-20 p-25'>
        <p className='font-poppins font-[700] text-[48px] text-transparent bg-clip-text bg-gradient-to-r  from-[#B0A5A5] to-[#995C5C]'>HELP US WITH REPORTING</p>
        <MissingReport/>
    </div>
  )
}

export default MissingReportScreen