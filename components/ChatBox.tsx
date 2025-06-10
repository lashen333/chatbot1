'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  onClose: () => void;
}

export default function ChatBox({ onClose }: Props) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! Ask me anything about Conversion Rate Optimization (CRO). 💡' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat-rag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error:', errorText);
        return;
      }

      const data = await response.json();
      console.log('🔁 Response:', data);

      if (!data || !data.reply || !data.reply.content) {
        console.error('Invalid response format:', data);
        return;
      }

      setMessages([...newMessages, data.reply]);
    } catch (err) {
      console.error('Error sending message:', err);
      setMessages([
        ...newMessages,
        { role: 'assistant', content: '❌ Error: Could not get a reply from AI.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-20 right-4 bg-white w-80 h-96 border border-gray-300 rounded-xl shadow-lg flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <h4 className="font-bold text-black">CRO Chatbot</h4>
        <button onClick={onClose}>✖</button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((m, i) =>
          m?.role && m?.content ? (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex items-start ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'assistant' && (
                <div className="flex-shrink-0 w-8 h-8 bg-fuchsia-600 text-white flex items-center justify-center rounded-full text-xs mr-2">
                  🤖
                </div>
              )}
              <div
                className={`max-w-xs px-4 py-2 rounded-lg text-sm shadow ${m.role === 'user'
                    ? 'bg-fuchsia-600 text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
              >
                {m.content}
              </div>
              {m.role === 'user' && (
                <div className="flex-shrink-0 w-8 h-8 bg-gray-400 text-white flex items-center justify-center rounded-full text-xs ml-2">
                  👤
                </div>
              )}
            </motion.div>
          ) : null
        )}

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-start justify-start"
          >
            <div className="w-8 h-8 bg-fuchsia-600 text-white flex items-center justify-center rounded-full text-xs mr-2">
              🤖
            </div>
            <div className="animate-pulse text-sm italic text-gray-500">Typing...</div>
          </motion.div>
        )}

      </div>

      <div className="p-2 border-t flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-1 p-2 border text-black rounded mr-2 text-sm"
          placeholder="Ask about CRO..."
        />
        <button onClick={sendMessage} className="bg-fuchsia-600 text-white px-3 py-1 rounded">
          Send
        </button>
      </div>
    </div>
  );
}
