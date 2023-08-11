import React, { useState } from "react";
import avatar from "./assets/avatar.jpg";
import { FaRegPaperPlane } from "react-icons/fa";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: "bot", type: "text", text: "Hello, this is Tech" },
    {
      sender: "bot",
      type: "text",
      text: "I am your personal assistant, here to help you today",
    },
  ]);

  const [textInput, setTextInput] = useState("");

  const toggleChatWindow = () => {
    setIsOpen(!isOpen);
  };

  const addMessage = () => {
    chatMessages.push({
      sender: "user",
      type: "text",
      text: textInput,
    });

    setChatMessages(chatMessages);
    setIsOpen(false); //necessary to update this state to force the reload of the elements containing the messages, due to the nested selection statements
  };

  return (
    <div className="App">
      <div className="chatbot-container">
        {isOpen ? (
          <div className="chat-window">
            <div className="bot-status-container">
              <img src={avatar} width={50} height={50} className="avatar-img" />
              <p className="bot-name">Tech Cortex</p>
              <p className="state-text">Online</p>
              <button className="close-button" onClick={toggleChatWindow}>
                X
              </button>
            </div>

            <div className="chat-container">
              {chatMessages.map((message) => {
                return (
                  <div
                    className={`chat-message-container ${
                      message.sender === "bot" ? "bot-message" : "user-message"
                    }`}
                  >
                    <img
                      src={avatar}
                      className="chat-avatar"
                      width={40}
                      height={40}
                    ></img>
                    <p className="chat-message-text">{message.text}</p>
                  </div>
                );
              })}
            </div>

            <div className="controls-container">
              <input
                className="text-input"
                type="text"
                placeholder="  Type your message here..."
                onChange={(e) => {
                  setTextInput(e.target.value);
                }}
              />
              <button className="send-button" onClick={addMessage}>
                <FaRegPaperPlane />
              </button>
            </div>
          </div>
        ) : (
          <button className="chat-button" onClick={toggleChatWindow}></button>
        )}
      </div>
    </div>
  );
}

export default App;
