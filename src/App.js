import React, { useEffect, useState } from "react";
import botAvatar from "./assets/avatar.jpg";
import { FaBook, FaClock, FaQuestion, FaRegPaperPlane } from "react-icons/fa";
import ChatMessageText from "./Components/chatMessageText";
import ChatMessageChoice from "./Components/chatMessageChoice";

// TODO:
// add animations and breakpoints
// build llm model: https://www.google.com/search?q=best+open+source+llm&sca_esv=556685652&sxsrf=AB5stBgoKRvVwY-jRhlhhAHHXQB_YCxeUg%3A1692000239087&source=hp&ei=79_ZZMiBA4mhkdUP5MS_oA8&iflsig=AD69kcEAAAAAZNnt_zWwWpVqKmQ-lH9om-dzaLjOIGmC&ved=0ahUKEwiItdWJ2NuAAxWJUKQEHWTiD_QQ4dUDCAk&uact=5&oq=best+open+source+llm&gs_lp=Egdnd3Mtd2l6IhRiZXN0IG9wZW4gc291cmNlIGxsbTIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgARIwyBQAFj9HnADeACQAQCYAd4BoAGaHKoBBjAuMjIuMbgBA8gBAPgBAcICBRAuGIAEwgILEC4YgAQYxwEY0QPCAgsQLhiABBjHARivAcICBxAjGIoFGCfCAgQQIxgnwgIIEAAYigUYkQLCAgcQABiKBRhDwgIIEAAYgAQYyQPCAggQABiKBRiSA8ICDhAuGIoFGMcBGNEDGJECwgIHEAAYgAQYCsICChAAGIAEGMkDGAo&sclient=gws-wiz#fpstate=ive&vld=cid:738a86cf,vid:hMJgdVJWQRU

// LOGIC:
// store messages as dictionaries in chatMessages state variable
// use last message to determine input type. E.g if the last message is a choice from the bot, the text input must be disabled
// store the user replies in dictionary with question tags

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: "bot", type: "text", text: "Hello, this is Tech", tag: "intro" },
    {
      sender: "bot",
      type: "text",
      text: "I am your personal assistant. How can I help you today?",
      tag: "intro",
    },
    {
      sender: "bot",
      type: "choice",
      tag: "menu",
      options: [
        {
          text: "Ask a question",
          icon: <FaQuestion />,
        },
        {
          text: "Book a call",
          icon: <FaBook />,
        },
      ],
    },
  ]);

  const [textInput, setTextInput] = useState("");
  const [canType, setCanType] = useState(false); //determines if text input is enabled or disabled
  const [answers, setAnswers] = useState([]); //store previous answers given by the user. Format: {
  //    tag: string
  //    value: string
  // }

  const toggleChatWindow = () => {
    // remove all of the choice messages, sice they are not necessary when window is closed and re-open
    // this gets around the glitch caused by non-persistent state in the choice components

    if (isOpen) {
      const newChatMessages = chatMessages.filter((message) => {
        return (
          message.type !== "choice" ||
          chatMessages.indexOf(message) === chatMessages.length - 1
        );
      });

      setChatMessages(newChatMessages);
    }

    setIsOpen(!isOpen);
  };

  const getReply = (userMessage) => {
    // ==== main bot logic ====
    // depending on the user message sent generate appropriate bot reply
    // this is the part that varies from bot to bot

    // if user selects ask a question in the first choice section
    if (userMessage.tag === "menu" && userMessage.text === "Ask a question") {
      addBotMessage([
        {
          sender: "bot",
          type: "text",
          text: "Ok, what would you like to know?",
          tag: "menu->question_input",
        },
      ]);
    }

    if (userMessage.tag === "menu->question_input") {
      // TODO: use large language model with custom knowledge base to answer question

      addBotMessage([
        {
          sender: "bot",
          type: "text",
          text: "Demo answer",
          tag: "question_answer",
        },
      ]);

      // todo: ask if user wants to re-start conversation
    }

    // if the user selects book a call in the first choice section
    if (userMessage.tag === "menu" && userMessage.text === "Book a call") {
      addBotMessage([
        {
          sender: "bot",
          type: "text",
          text: "Ok, what is your name?",
          tag: "menu->name_input",
        },
      ]);
    }

    if (userMessage.tag === "menu->name_input") {
      setAnswers([
        ...answers,
        {
          tag: userMessage.tag,
          value: userMessage.text,
        },
      ]);

      addBotMessage([
        {
          sender: "bot",
          type: "text",
          text: "Thanks, please enter your email address",
          tag: "menu->email_input",
        },
      ]);
    }

    if (userMessage.tag === "menu->email_input") {
      // TODO: get time slots available using the callendly api
      setAnswers([
        ...answers,
        {
          tag: userMessage.tag,
          value: userMessage.text,
        },
      ]);

      addBotMessage([
        {
          sender: "bot",
          type: "text",
          text: "Please select one of the available time slots",
          tag: "time_slots_text",
        },
        {
          sender: "bot",
          type: "choice",
          tag: "menu->time_slots",
          options: [
            {
              text: "05/08/2023 16:00",
              icon: <FaClock />,
            },
            {
              text: "07/08/2023 17:00",
              icon: <FaClock />,
            },
            {
              text: "10/08/2023 18:00",
              icon: <FaClock />,
            },
          ],
        },
      ]);
    }

    if (userMessage.tag === "menu->time_slots") {
      // TODO: use callendly api to create booking
      addBotMessage([
        {
          sender: "bot",
          type: "text",
          text: "Great, I have just booked your call, you are all set. It was a pleasure talking with you.",
          tag: "goodbye",
        },
      ]);

      setCanType(false);
    }
  };

  const addUserMessage = (messageText) => {
    const newMessage = {
      sender: "user",
      type: "text",
      text: messageText,
      tag: chatMessages[chatMessages.length - 1].tag,
    };

    setChatMessages([...chatMessages, newMessage]);
    setCanType(false);
  };

  const addBotMessage = (messages) => {
    setChatMessages([...chatMessages, ...messages]);
    const lastMessage = messages[messages.length - 1];

    if (lastMessage.type === "text") {
      setCanType(true);
    } else if (lastMessage.type === "choice") {
      setCanType(false);
    }
  };

  useEffect(() => {
    console.log(chatMessages);
    const lastMessage = chatMessages[chatMessages.length - 1];

    if (lastMessage.sender === "user") {
      getReply(lastMessage);
    }
  }, [chatMessages]);

  return (
    <div className="App">
      <div className="chatbot-container">
        {isOpen ? (
          //when bot is opened show the bot window
          <div className="chat-window">
            {/* container at the top with the bot information and avatar */}
            <div className="bot-status-container">
              <img
                src={botAvatar}
                width={50}
                height={50}
                className="avatar-img"
              />
              <p className="bot-name">Tech Cortex</p>
              <p className="state-text">Online</p>
              <button className="close-button" onClick={toggleChatWindow}>
                X
              </button>
            </div>

            {/* container with the chat messages */}
            {/* the messages are stored in the 'chatMessages' state variable */}
            <div className="chat-container">
              {chatMessages.map((message) => {
                // depending on the author of the message and its type use different colours and avatars
                if (message.type === "text") {
                  return <ChatMessageText message={message} />;
                } else if (message.type === "choice") {
                  return (
                    <ChatMessageChoice
                      message={message}
                      addUserMessage={addUserMessage}
                    />
                  );
                }
              })}
            </div>

            {/* container at the bottom of the page with the text input to allow the user to enter and new message */}
            {/* container also has button with icon which allows user to send message */}
            <div className="controls-container">
              <input
                className="text-input"
                type="text"
                placeholder="  Type your message here..."
                onChange={(e) => {
                  setTextInput(e.target.value);
                }}
                disabled={!canType} //if the last message is a choice question by the bot, disable the text input
              />
              <button
                className="send-button"
                onClick={() => addUserMessage(textInput)}
              >
                <FaRegPaperPlane />
              </button>
            </div>
          </div>
        ) : (
          // when the bot is closed display circular button with bot avatar at the bottom of the page
          <button className="chat-button" onClick={toggleChatWindow}>
            <img
              src={botAvatar}
              width={70}
              height={70}
              style={{ borderRadius: "50px" }}
            />
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
