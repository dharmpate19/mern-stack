import RobotProfileImage from "../assets/chatbot.png";
import UserProfileImage from "../assets/user.png";

function ChatMessage({ message, sender }) {
  return (
    <div
      className={
        sender === "robot"
          ? "chat-message chat-message-robot"
          : "chat-message chat-message-user"
      }
    >
      {sender === "robot" && (
        <img src={RobotProfileImage} alt="user image" width="50" />
      )}
      <span className="chat-message-contents">
        {message === "...Loading" ? (
          <div className="dot-loader"></div>
        ) : (
          message
        )}
      </span>
      {sender === "user" && (
        <img src={UserProfileImage} alt="user image" width="50" />
      )}
    </div>
  );
}

export default ChatMessage;
