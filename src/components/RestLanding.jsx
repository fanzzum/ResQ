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
    <div className='w-360 h-900 bg-[linear-gradient(180deg,#336887,#4B84A6,#5B88A4)] flex flex-col gap-20 items-center'>
        <div className='flex gap-15 justify-center p-15'>
          <div className='w-92 h-50 bg-[linear-gradient(180deg,#234A61,#678AA0)] rounded-[10px] border-[1px] border-[#ffffff40] flex flex-col justify-center items-center gap-5'>
            <p className='font-poppins font-[700] text-[24px] text-white'>Missing Reports</p>
            <p className='font-poppins font-[700] text-[40px] text-white'>50</p>
          </div>
          <div className='w-92 h-50 bg-[linear-gradient(180deg,#234A61,#678AA0)] rounded-[10px] border-[1px] border-[#ffffff40] flex flex-col justify-center items-center gap-5'>
            <p className='font-poppins font-[700] text-[24px] text-white'>Rescued Reports</p>
            <p className='font-poppins font-[700] text-[40px] text-white'>50</p>
          </div>
          <div className='w-92 h-50 bg-[linear-gradient(180deg,#234A61,#678AA0)] rounded-[10px] border-[1px] border-[#ffffff40] flex flex-col justify-center items-center gap-5'>
            <p className='font-poppins font-[700] text-[24px] text-white'>Total User</p>
            <p className='font-poppins font-[700] text-[40px] text-white'>50</p>
          </div>
        </div>
        
        <p className='inter font-[700] text-[60px] text-transparent  bg-clip-text bg-gradient-to-r from-[#ffffff] to-[#E0C0C0] inline-block '>How the automated system <br/>works</p>
        <p className='inter font-[700] text-[32px] text-transparent  bg-clip-text bg-gradient-to-r from-[#ffffff] to-[#FFFD8F] inline-block '>Multi-Source Ingestion Engine</p>
        <div className='flex gap-15 justify-center'>
          <div className='bg-[#ffffff30] w-93 h-115 rounded-[74px] shadow-neu flex flex-col items-center'>
            <img src={webScrapper} className='w-80 '/>
            <p className='inter font-[700] text-[24px] text-transparent  bg-clip-text bg-gradient-to-r from-[#ffffff] to-[#FFFD8F] inline-block '>Web Scrappers</p>
            <p className='font-poppins font-[300] text-[16px] text-white w-77 text-center'>pulls from missing persons boards, NGO sites, news portals, social media posts and overall web</p>
          </div>

          <div className='bg-[#ffffff30] w-93 h-115 rounded-[74px] shadow-neu flex flex-col items-center'>
            <img src={botIntegration} className='w-80 '/>
            <p className='inter font-[700] text-[24px] text-transparent  bg-clip-text bg-gradient-to-r from-[#ffffff] to-[#FFFD8F] inline-block '>Bot Integration</p>
            <p className='font-poppins font-[300] text-[16px] text-white w-77 text-center'>Interfaces with group chat platforms (e.g. Telegram, Whatsapp) via NLP + webhook triggers</p>
          </div>

          <div className='bg-[#ffffff30] w-93 h-115 rounded-[74px] shadow-neu flex flex-col items-center'>
            <img src={manualReport} className='w-80 '/>
            <p className='inter font-[700] text-[24px] text-transparent  bg-clip-text bg-gradient-to-r from-[#ffffff] to-[#FFFD8F] inline-block '>Manual Report</p>
            <p className='font-poppins font-[300] text-[16px] text-white w-77 text-center'>Submitted through a secure, user friendly web form</p>
          </div>
        </div>


          
         <div className='h-full w-full flex items-center justify-center absolute'>
          <div className="absolute left-[140px] top-[1416px] rotate-[-145.47deg] w-[600px] h-0 border-[3px] border-white rotate-90 opacity-50" />

          <div className="absolute  top-[1410px] w-[340px] h-0 border-[3px] border-white rotate-90 opacity-50" />

          <div className="absolute left-[720px] top-[1416px] rotate-[145.47deg] w-[600px] h-0 border-[3px] border-white rotate-90 opacity-50" />
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
          <div className='h-full w-full  flex items-center justify-center absolute'>
          <div className="absolute left-[140px] top-[650px] rotate-[135.47deg] w-[650px] h-0 border-[3px] border-white rotate-90 opacity-50" />

          <div className="absolute  top-[650px] w-[470px] h-0 border-[3px] border-white rotate-90 opacity-50" />

          <div className="absolute left-[650px] top-[650px] rotate-[-135.47deg] w-[650px] h-0 border-[3px] border-white rotate-90 opacity-50" />
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


    <div className='w-360 h-256 flex bg-[linear-gradient(180deg,#FFFFFF,#C8DEEB,#AACEE5,#9EC7D9)]'>
      <img src={chatbot} className='w-192 h-192'/>
      <div className='flex flex-col absolute text-left w-172 ml-180 pt-20 gap-10'>
        <p className='font-inter font-[700] text-[96px] text-transparent bg-clip-text bg-gradient-to-r  from-[#7A6969] to-[#E0C0C0] '>
          Now Available CHATBOT
        </p>
        <p className='font-inter font-[600] text-[32px] text-[#FF9E9E]'>
          Your real-time assistant for reporting and tracking missing persons.
        </p>
        <p className='font-inter font-[500] text-[20px] text-white'>
          The ResQMap ChatBot is here to help — whether you're filing a report, checking updates, or guiding someone in need. Accessible directly from our web platform, it brings speed, simplicity, and smart support to every rescue effort.
        </p>
      </div>
    </div>

    <div className='w-360 h-256 bg-[#9FC7D9] flex flex-col gap-7 p-29'>
      <p className='font-inter font-[700] text-[96px] text-transparent bg-clip-text bg-gradient-to-r  from-[#606060] to-[#9F7878] '>Every Report Is a Life. Every Ping Is a Chance.</p>
      <p className='font-inter font-[700] text-[24px] text-white'>Behind every dot on the map is a family waiting, a voice unheard, a life that matters.
      At ResQMap, we believe technology should do more than connect us — it should help us care.</p>
      <p className='font-inter font-[700] text-[32px] text-white'>Join the movement. <div className='text-[#7A6969] inline'>Report.</div> 
       <div className='text-[#7A6969] inline'>Respond.</div>. <div className='text-[#7A6969] inline'>Reunite.</div>.</p>
    </div>
    </>
    
  )
}

export default RestLanding