import React, { useEffect, useRef } from 'react'
import chatbot from '../assets/icons/chatbot.gif'

const MessageList = ({ messages, isBotTyping }) => {
  const bottomRef = useRef(null)

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isBotTyping])

  return (
    <div className="flex-1 overflow-y-auto space-y-2 p-4 flex flex-col">
      {messages.map((msg, i) => (
        <div key={i} className="flex flex-col">
          {msg.role === 'bot' && (
            <span className="text-md text-[#F64949] font-[700] mb-1">ResQBot</span>
          )}
          <div
            className={`p-2 rounded max-w-sm ${
              msg.role === 'user'
                ? 'bg-white text-black text-right p-[7px_18px] shadow-[0px_4px_4px_0px_#00000040] self-end'
                : 'bg-gray-300 text-black self-start'
            }`}
          >
            {msg.content}
          </div>
        </div>
      ))}

      {isBotTyping && (
        <div className="self-start flex flex-col">
          <span className="text-xs text-gray-600 font-semibold mb-1">Chatbot</span>
          <img src={chatbot} alt="thinking" className="w-30 h-30" />
          <div className="flex items-center space-x-2 bg-gray-200 px-3 py-2 rounded-lg max-w-sm">
            <p className="italic text-gray-500">Chatbot is thinking...</p>
          </div>
        </div>
      )}

      {/* Dummy div for auto-scroll */}
      <div ref={bottomRef} />
    </div>
  )
}

export default MessageList

