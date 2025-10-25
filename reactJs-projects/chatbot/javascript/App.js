      function ChatInput({ chatMessages, setChatMessages }) {
        const [inputText, setInputText] = React.useState("");
        const [isLoading, setIsLoading] = React.useState("");
        function handleChange(e) {
          setInputText(e.target.value);
        }
        async function sendMessage() {
          if (isLoading || inputText === "") {
            return;
          }
          setInputText("");
          setIsLoading(true);
          const newChatMessages = [
            ...chatMessages,
            {
              id: crypto.randomUUID(),
              message: inputText,
              sender: "user",
            },
          ];

          setChatMessages([
            ...newChatMessages,
            {
              id: crypto.randomUUID(),
              message: "...Loading",
              sender: "robot",
            },
          ]);
          const response = await Chatbot.getResponseAsync(inputText);
          setChatMessages([
            ...newChatMessages,
            {
              id: crypto.randomUUID(),
              message: response,
              sender: "robot",
            },
          ]);
          setIsLoading(false);
        }

        function handleKeyEvent(e) {
          if (e.key === "Enter") {
            sendMessage();
          } else if (e.key === "Escape") {
            setInputText("");
          }
        }
        return (
          <div className="input-container">
            <input
              placeholder="Send a message to Chatbot"
              size="30"
              onChange={handleChange}
              value={inputText}
              onKeyDown={handleKeyEvent}
              className="chat-input"
            />
            <button className="send-button" onClick={sendMessage}>
              Send
            </button>
          </div>
        );
      }

      function ChatMessage({ message, sender }) {
        let srcImage;

        return (
          <div
            className={
              sender === "robot"
                ? "chat-message chat-message-robot"
                : "chat-message chat-message-user"
            }
          >
            {sender === "robot" && (
              <img src="./images/chatbot.png" alt="user image" width="50" />
            )}
            <span className="chat-message-contents">{message}</span>
            {sender === "user" && (
              <img src="./images/user.png" alt="user image" width="50" />
            )}
          </div>
        );
      }

      function ChatMessages({ chatMessages }) {
        const chatMessagesRef = React.useRef(null)
        React.useEffect(() => {
          const containerElemn = chatMessagesRef.current;
          if(containerElemn) {
          containerElemn.scrollTop = containerElemn.scrollHeight;
          }
        }, [chatMessages])
        return (
          <div ref={chatMessagesRef} className="chat-message-container">
            {chatMessages.map((chatMessage) => {
              return (
                <ChatMessage
                  key={chatMessage.id}
                  message={chatMessage.message}
                  sender={chatMessage.sender}
                />
              );
            })}
          </div>
        );
      }

      function App() {
        const [chatMessages, setChatMessages] = React.useState([]);
        const [inputTop, setInputTop] = React.useState(true);
        function switchInputText() {
          console.log("clicked");
          if (!inputTop) {
            setInputTop(true);
          } else {
            setInputTop(false);
          }
        }
        return (
          <>
            <div className="chatbot-container">
              <p className="welcome-message">
                {chatMessages.length > 0
                  ? ""
                  : " Welcometo the chatbot project! Send a message using the textbox below."}
              </p>
              <div
                className={
                  inputTop
                    ? "input-chatbot-container input-top"
                    : "input-chatbot-container input-bottom"
                }
              >
                {inputTop ? (
                  <ChatInput
                    chatMessages={chatMessages}
                    setChatMessages={setChatMessages}
                  />
                ) : (
                  ""
                )}

                <ChatMessages chatMessages={chatMessages} />
                {inputTop ? (
                  ""
                ) : (
                  <ChatInput
                    chatMessages={chatMessages}
                    setChatMessages={setChatMessages}
                  />
                )}
              </div>
            </div>
            <button className="input-controller-text" onClick={switchInputText}>
              Move textbox to {inputTop ? "bottom" : "top"}
            </button>
          </>
        );
      }

      const container = document.querySelector(".js-container");
      const root = ReactDOM.createRoot(container);
      root.render(<App />);
    