import React, { useRef, useState, useEffect } from 'react'
import ChatApp from './ChatApp'

const AskAi = () => {
  const [showChat, setShowChat] = useState(false)
  const [pendingMessage, setPendingMessage] = useState('')
  const inputRef = useRef(null)

  // Lock/unlock body scroll when chat is open/closed
  useEffect(() => {
    if (showChat) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [showChat])

  // Handle Enter key in input
  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && inputRef.current.value.trim()) {
      setPendingMessage(inputRef.current.value)
      setShowChat(true)
      inputRef.current.value = ''
    }
  }

  // Overlay click handler to close chat
  const handleOverlayClick = (e) => {
    if (e.target.id === 'askai-chat-overlay') setShowChat(false)
  }

  return (
    <div className='flex flex-col items-center gap-10 bg-transparent relative z-[10000]'>
      <p className='font-inter font-[400] text-[32px] text-white w-[1100px] text-center'>
        <span className='inline font-[700]'>Looking for someone?</span> Let our AI help.<br />
        Enter any detail—name, date, or location—and we'll search through all<br />
        reports available online to assist you in finding your loved one.
      </p>
      <input
        ref={inputRef}
        className='w-184 h-16 bg-white rounded-[10px] font-inter font-[200] placeholder:italic text-[20px] p-7'
        placeholder='Ask Ai for information or submit missing report.... '
        onKeyDown={handleInputKeyDown}
      />

      {/* ChatApp Overlay */}
      {showChat && (
        <div
          id="askai-chat-overlay"
          className="fixed inset-0 z-[9999] bg-transparent backdrop-blur-md flex items-start justify-center"
          onClick={handleOverlayClick}
        >
          <div className="mt-25 w-full max-w-[1300px] relative" onClick={e => e.stopPropagation()}>
            {/* Close Button */}
            <button
              className="absolute top-14 left-14 z-10 text-3xl text-white text-[45px] w-10 h-10 flex items-center justify-center hover:bg-opacity-100 transition"
              onClick={() => setShowChat(false)}
              aria-label="Close chat"
            >
              ×
            </button>
            <ChatApp initialMessage={pendingMessage} />
          </div>
        </div>
      )}
    </div>
  )
}

export default AskAi