"use client";

import React, { useState } from "react";
import { Paperclip, Send, User, Bot } from "lucide-react";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi there! What would you like to read today?", time: new Date() },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMsg = { sender: "user", text: input.trim(), time: new Date() };
    setMessages([...messages, newMsg]);

    // Simulated bot reply
    setTimeout(() => {
      const botMsg = {
        sender: "bot",
        text: `Got it! "${input.trim()}" sounds great.`,
        time: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1000);

    setInput("");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadMsg = {
      sender: "user",
      text: `📎 Uploaded: ${file.name}`,
      time: new Date(),
    };
    setMessages([...messages, uploadMsg]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1e3a8a] to-[#1e2a47] text-white flex flex-col justify-between">
      <div className="flex-1 w-full max-w-2xl mx-auto p-4 space-y-4 overflow-y-auto">
        <div className="flex flex-col space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start space-x-2 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "bot" && (
                <div className="flex items-center space-x-2">
                  <Bot className="w-6 h-6 text-blue-400 mt-1" />
                </div>
              )}
              <div
                className={`p-4 rounded-xl max-w-xs ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                <p>{msg.text}</p>
                <p className="text-xs text-right opacity-60 mt-1">
                  {msg.time.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              {msg.sender === "user" && (
                <div className="flex items-center space-x-2">
                  <User className="w-6 h-6 text-blue-300 mt-1" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center w-full max-w-2xl mx-auto p-4 space-x-2">
        <label className="cursor-pointer">
          <Paperclip className="w-5 h-5 text-gray-300" />
          <input type="file" onChange={handleFileUpload} className="hidden" />
        </label>
        <input
  type="text"
  value={input}
  onChange={(e) => setInput(e.target.value)}
  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
  placeholder="Talk to me"
  className="flex-1 px-4 py-2 rounded-lg focus:outline-none focus:ring bg-gray-200 text-gray-700"
/>

        <button onClick={sendMessage} className="p-2 bg-blue-500 text-white rounded-lg">
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
