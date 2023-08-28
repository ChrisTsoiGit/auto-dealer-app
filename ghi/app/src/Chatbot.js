import React, { useState, useEffect } from 'react';
import { getBotResponse } from './api/chatbotApi'; 

function Chatbot() {

  const [input, setInput] = useState('');
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // scroll to bottom on new messages
    const chatContainer = document.getElementById('chat-container');
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [conversations]);

  const handleInputChange = (event) => {
    setInput(event.target.value.trim());
  }

  const handleSubmit = async () => {
    setIsLoading(true);

    const message = {
      text: input,
      sender: 'user'
    };

    setConversations(prev => [...prev, message]);

    try {
      const botMessage = await getBotResponse(input);

      setConversations(prev => [...prev, botMessage]);  
    } catch (error) {
      setConversations(prev => [...prev, {
        text: 'Sorry, an error occurred',
        sender: 'bot'
      }]);
    }

    setIsLoading(false);
    setInput('');
  }

  return (
    <div id="chat-container">
      {isLoading && <div>Loading...</div>}

      {conversations.map((message, index) => (
        <div key={index} className={`message ${message.sender}`}>
          <p>{message.text}</p>
        </div>
      ))}

      <input 
        value={input}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>
        Send
      </button>

    </div>
  );

}

export default Chatbot;

