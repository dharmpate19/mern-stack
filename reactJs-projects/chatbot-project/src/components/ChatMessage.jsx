import RobotProfileImage from "../assets/chatbot.png";
import UserProfileImage from "../assets/user.png";
import dayjs from 'dayjs'

function ChatMessage({ message, sender }) {
  const time = dayjs().valueOf();
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
          <div>
          <span>{message}</span>
            <span className="chat-time">{dayjs(time).format('h:mma')}</span>
            </div>
        )}
      </span>
      {sender === "user" && (
        <img src={UserProfileImage} alt="user image" width="50" />
      )}
    </div>
  );
}

export default ChatMessage;
