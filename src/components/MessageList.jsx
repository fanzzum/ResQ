import React from 'react'

const MessageList = ({ messages, isBotTyping }) => (
  <div className="flex-1 overflow-y-auto space-y-2 p-4 flex flex-col">
    {messages.map((msg, i) => (
      <div
        key={i}
        className={`p-2 rounded max-w-sm ${
          msg.role === 'user'
            ? 'bg-white text-black text-right p-[7px_18px] shadow-[0px_4px_4px_0px_#00000040] self-end'
            : 'bg-gray-300 text-black self-start'
        }`}
      >
        {msg.content}
      </div>
    ))}

    {isBotTyping && (
      <div className="self-start">
        <p className="text-sm text-gray-600 font-semibold mb-1">Chatbot</p>
        <div className="flex items-center space-x-2 bg-gray-200 px-3 py-2 rounded-lg max-w-sm">
          <img src="/loading.gif" alt="thinking" className="w-5 h-5" />
          <p className="italic text-gray-500">Chatbot is thinking...</p>
        </div>
      </div>
    )}
  </div>
)

export default MessageList

