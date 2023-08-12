// component used to show a text message in the chat
import botAvatar from "../assets/avatar.jpg";
import userAvatar from "../assets/user_avatar.png";

function ChatMessageText({ message }) {
  // message: {
  //  sender: 'user' | 'bot',
  //  type: 'text',
  //  text: string
  //  tag: string}

  return (
    <div
      className={`chat-message-container ${
        message.sender === "bot" ? "bot-message" : "user-message"
      }`}
    >
      <img
        src={message.sender === "bot" ? botAvatar : userAvatar}
        className="chat-avatar"
        width={40}
        height={40}
      ></img>
      <p className="chat-message-text">{message.text}</p>
    </div>
  );
}

export default ChatMessageText;
