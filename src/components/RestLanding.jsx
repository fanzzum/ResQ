import React from 'react'
import webScrapper from '../assets/icons/webScrapper.png'
import botIntegration from '../assets/icons/botIntegration.png'
import manualReport from '../assets/icons/manualReport.png'
import deduplication from '../assets/icons/Deduplication.png'
import restfulAPI from '../assets/icons/restfulAPI.png'
import progressive from '../assets/icons/progressiveWebInterface.png'
import responderPortal from '../assets/icons/responderPortal.png'
import chatbot from '../assets/pictures/chatbot.png'
const RestLanding = () => {
  return (
    <>
    <div className='w-full max-w-[2600px] mx-auto min-h-screen bg-[linear-gradient(180deg,#336887,#4B84A6,#5B88A4)] flex flex-col gap-10 md:gap-16 xl:gap-20 items-center px-4 md:px-10 xl:px-24 py-8'>
        <div className='flex flex-col md:flex-row gap-6 md:gap-10 xl:gap-15 justify-center w-full'>
          <div className='flex-1 min-w-[180px] max-w-[320px] h-36 md:h-44 xl:h-50 bg-[linear-gradient(180deg,#234A61,#678AA0)] rounded-[10px] border border-[#ffffff40] flex flex-col justify-center items-center gap-2 md:gap-4 xl:gap-5'>
            <p className='font-poppins font-bold text-lg md:text-xl xl:text-2xl text-white'>Missing Reports</p>
            <p className='font-poppins font-bold text-3xl md:text-4xl xl:text-5xl text-white'>50</p>
          </div>
          <div className='flex-1 min-w-[180px] max-w-[320px] h-36 md:h-44 xl:h-50 bg-[linear-gradient(180deg,#234A61,#678AA0)] rounded-[10px] border border-[#ffffff40] flex flex-col justify-center items-center gap-2 md:gap-4 xl:gap-5'>
            <p className='font-poppins font-bold text-lg md:text-xl xl:text-2xl text-white'>Rescued Reports</p>
            <p className='font-poppins font-bold text-3xl md:text-4xl xl:text-5xl text-white'>50</p>
          </div>
          <div className='flex-1 min-w-[180px] max-w-[320px] h-36 md:h-44 xl:h-50 bg-[linear-gradient(180deg,#234A61,#678AA0)] rounded-[10px] border border-[#ffffff40] flex flex-col justify-center items-center gap-2 md:gap-4 xl:gap-5'>
            <p className='font-poppins font-bold text-lg md:text-xl xl:text-2xl text-white'>Total User</p>
            <p className='font-poppins font-bold text-3xl md:text-4xl xl:text-5xl text-white'>50</p>
          </div>
        </div>
        
        <p className='inter font-bold text-3xl md:text-5xl xl:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] to-[#E0C0C0] text-center'>How the automated system <br/>works</p>
        <p className='inter font-bold text-xl md:text-2xl xl:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] to-[#FFFD8F] text-center'>Multi-Source Ingestion Engine</p>
        <div className='flex flex-col md:flex-row gap-6 md:gap-10 xl:gap-15 justify-center w-full'>
          <div className='bg-[#ffffff30] flex-1 min-w-[220px] max-w-[350px] h-auto rounded-[40px] md:rounded-[74px] shadow-neu flex flex-col items-center p-4'>
            <img src={webScrapper} className='w-40 md:w-56 xl:w-80'/>
            <p className='inter font-bold text-lg md:text-xl xl:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] to-[#FFFD8F] text-center'>Web Scrappers</p>
            <p className='font-poppins font-light text-base md:text-lg text-white w-full text-center'>pulls from missing persons boards, NGO sites, news portals, social media posts and overall web</p>
          </div>
          <div className='bg-[#ffffff30] flex-1 min-w-[220px] max-w-[350px] h-auto rounded-[40px] md:rounded-[74px] shadow-neu flex flex-col items-center p-4'>
            <img src={botIntegration} className='w-40 md:w-56 xl:w-80'/>
            <p className='inter font-bold text-lg md:text-xl xl:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] to-[#FFFD8F] text-center'>Bot Integration</p>
            <p className='font-poppins font-light text-base md:text-lg text-white w-full text-center'>Interfaces with group chat platforms (e.g. Telegram, Whatsapp) via NLP + webhook triggers</p>
          </div>
          <div className='bg-[#ffffff30] flex-1 min-w-[220px] max-w-[350px] h-auto rounded-[40px] md:rounded-[74px] shadow-neu flex flex-col items-center p-4'>
            <img src={manualReport} className='w-40 md:w-56 xl:w-80'/>
            <p className='inter font-bold text-lg md:text-xl xl:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] to-[#FFFD8F] text-center'>Manual Report</p>
            <p className='font-poppins font-light text-base md:text-lg text-white w-full text-center'>Submitted through a secure, user friendly web form</p>
          </div>
        </div>


          
         

    

        <p className='font-inter z-10 font-[500] text-[24px] text-white bg-[#ffffff30] w-93 text-center rounded-[74px] shadow-neu p-5'>All inputs are funneled into a centralized queue</p>
        <div className='flex'>
        <img src={deduplication} className='w-204 '/>
        <p className='inter font-[700] text-[32px] ml-170 text-transparent p-27 absolute bg-clip-text bg-gradient-to-r from-[#ffffff] to-[#FFFD8F] inline-block text-right'>Verification & Deduplication Layer</p>
        </div>

        <div className='flex flex-col gap-6 p-4 w-232 h-113 bg-[#ffffff30] shadow-neu rounded-[74px] items-center'>
          <p className='font-inter font-[600] text-[32px] text-white'>Incoming reports pass through:</p>
          
          <div className='text-[24px] font-inter text-white font-[200] text-center'>
            <div className='text-transparent  bg-clip-text bg-gradient-to-r from-[#ffffff] to-[#FFFD8F] inline-block font-[600]'>Fuzzy Matching Algorithms –</div>  to detect <div className='text-[#1E385B] inline'>duplicates</div> based on metadata (name, location, time)
          </div>
          <div className='text-[24px] font-inter text-white font-[200] text-center'>
            <div className='text-transparent  bg-clip-text bg-gradient-to-r from-[#ffffff] to-[#FFFD8F] inline-block font-[600]'>Heuristic Filters –</div>  rule-based systems for flagging <div className='text-[#1E385B] inline'>invalid</div> or <div className='text-[#1E385B] inline'>low-confidence</div> entries
          </div>
          <div className='text-[24px] font-inter text-white font-[200] text-center'>
            <div className='text-transparent  bg-clip-text bg-gradient-to-r from-[#ffffff] to-[#FFFD8F] inline-block font-[600]'>Verification Gateways –</div>  role-based <div className='text-[#1E385B] inline'>confirmation</div> by vetted responders or trusted partners (only for reports flagged low confidence by AI)
          </div>
          <div className='text-[24px] font-inter text-white font-[200] text-center'>
             Each report is scored for trustworthiness and tagged accordingly.
          </div>
          

        </div>
          <p className='font-inter font-[700] text-[32px] text-transparent  bg-clip-text bg-gradient-to-r from-[#ffffff] to-[#FFFD8F] inline-block w-80 mr-230 text-left'>Delivery Pipeline via Web Channels</p>
        <p className='font-inter font-[600] text-[20px] bg-[#ffffff30] shadow-neu text-white w-93  h-29 flex justify-center items-center text-center rounded-[74px]'>Verified reports are deployed through:</p>

        <div className='flex gap-15 justify-center'>
          <div className='bg-[#ffffff30] w-93 h-115 rounded-[74px] shadow-neu flex pt-19 flex-col items-center'>
            <img src={restfulAPI} className='w-80 '/>
            <p className='inter font-[700] text-[24px] text-transparent  bg-clip-text bg-gradient-to-r from-[#ffffff] to-[#FFFD8F] pt-8 inline-block '>RESTful APIs</p>
            <p className='font-poppins font-[300] text-[16px] text-white w-77 text-center'>powering map UIs, dashboards, and notification systems</p>
          </div>

          <div className='bg-[#ffffff30] w-93 h-115 rounded-[74px] shadow-neu flex flex-col items-center'>
            <img src={progressive} className='w-80 '/>
            <p className='inter font-[700] text-[24px] text-transparent  bg-clip-text bg-gradient-to-r from-[#ffffff] to-[#FFFD8F] inline-block '>Progressive Web Interface</p>
            <p className='font-poppins font-[300] text-[16px] text-white w-77 text-center'>real-time data sync using WebSockets or polling</p>
          </div>

          <div className='bg-[#ffffff30] w-93 h-115 rounded-[74px] shadow-neu flex flex-col items-center'>
            <img fill="#ffffff" src={responderPortal} className='w-80 '/>
            <p className='inter font-[700] text-[24px] text-transparent  bg-clip-text bg-gradient-to-r from-[#ffffff] to-[#FFFD8F] inline-block '>Responder Portals</p>
            <p className='font-poppins font-[300] text-[16px] text-white w-77 text-center'>secured with JWT auth and privilege levels (read, update, verify)</p>
          </div>
        </div>

        
    </div>


    <div className='w-full max-w-[2600px] mx-auto min-h-[300px] flex gap-15 flex-col md:flex-row items-center bg-[linear-gradient(180deg,#FFFFFF,#C8DEEB,#AACEE5,#9EC7D9)] px-4 md:px-10 xl:px-34 py-24 md:py-36 xl:py-48'>
      <img src={chatbot} className='w-80 md:w-104 xl:w-136 h-auto'/>
      <div className='flex flex-col text-left w-full md:w-2/3 xl:w-1/2 md:ml-16 pt-6 gap-6 md:gap-10 xl:gap-12'>
        <p className='font-inter font-bold text-3xl md:text-5xl xl:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[#7A6969] to-[#E0C0C0]'>
          Now Available CHATBOT
        </p>
        <p className='font-inter font-semibold text-lg md:text-2xl text-[#FF9E9E]'>
          Your real-time assistant for reporting and tracking missing persons.
        </p>
        <p className='font-inter font-medium text-base md:text-lg text-white'>
          The ResQMap ChatBot is here to help — whether you're filing a report, checking updates, or guiding someone in need. Accessible directly from our web platform, it brings speed, simplicity, and smart support to every rescue effort.
        </p>
      </div>
    </div>

    <div className='w-full max-w-[2700px]  mx-auto bg-[#9FC7D9] flex flex-col gap-8 md:gap-15 px-4 md:px-10 xl:px-34 py-24 md:py-36 xl:py-48 h-auto'>
      <p className='font-inter font-bold text-5xl md:text-7xl xl:text-[90px] text-transparent bg-clip-text bg-gradient-to-r from-[#606060] to-[#9F7878] text-center leading-tight xl:leading-[1.15]'>
        Every Report Is a Life.<br/> Every Ping Is a Chance.
      </p>
      <p className='font-inter font-bold text-base md:text-xl xl:text-2xl text-white text-center'>
        Behind every dot on the map is a family waiting, a voice unheard, a life that matters. At ResQMap, we believe technology should do more than connect us — it should help us care.
      </p>
      <p className='font-inter font-bold text-lg md:text-2xl xl:text-3xl text-center text-white'>
        Join the movement. <span className='text-[#7A6969]'>Report.</span> <span className='text-[#7A6969]'>Respond.</span> <span className='text-[#7A6969]'>Reunite.</span>
      </p>
    </div>
    </>
    
  )
}

export default RestLanding