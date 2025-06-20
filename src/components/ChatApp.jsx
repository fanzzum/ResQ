import React, { useState, useEffect } from 'react'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import axios from 'axios'

const ChatApp = ({ initialMessage = '' }) => {
  const [messages, setMessages] = useState([])
  const [isBotTyping, setIsBotTyping] = useState(false)

  const sendMessage = async (userInput) => {
    const newMessages = [...messages, { role: 'user', content: userInput }]
    setMessages(newMessages)
    setIsBotTyping(true)
    try {
      const res = await axios.post('https://xylem-api.ra-physics.space/administrator/chatbot/', {
        prompt: userInput
      })
      setMessages([...newMessages, { role: 'bot', content: res.data.response }])
    } catch (err) {
      setMessages([...newMessages, { role: 'bot', content: '⚠️ API error' }])
    }
    setIsBotTyping(false)
  }

  // Send initial message if provided
  useEffect(() => {
    if (initialMessage) {
      sendMessage(initialMessage)
    }
    // eslint-disable-next-line
  }, [initialMessage])

  return (
    <div className="flex w-full flex-col h-[80vh] m-10 rounded-[20px] p-10 bg-[#ffffff15] p-4">
      <MessageList messages={messages} isBotTyping={isBotTyping} />
      <MessageInput onSend={sendMessage} />
    </div>
  )
}

export default ChatApp
