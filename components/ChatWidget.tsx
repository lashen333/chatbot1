'use client';
import { useState } from 'react';
import ChatBox from './ChatBox';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && <ChatBox onClose={() => setIsOpen(false)} />}
      <div
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-fuchsia-600 hover:bg-fuchsia-700 text-white p-4 rounded-full shadow-lg cursor-pointer z-50"
      >
        💬
      </div>
    </>
  );
}
