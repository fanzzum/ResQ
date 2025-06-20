import { useState } from 'react'

const MessageInput = ({ onSend }) => {
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    onSend(input)
    setInput('')
  }

  return (
    <div className="mt-2 flex gap-4 justify-center">
      <input
        className="  bg-white w-xl p-2 rounded-[10px]"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <button
        onClick={handleSend}
        className="bg-[#405096] text-white rounded-[10px] px-4 "
      >
        Send
      </button>
    </div>
  )
}

export default MessageInput
