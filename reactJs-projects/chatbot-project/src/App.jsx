import { useState, useEffect } from "react";
import "./App.css";
import ChatInput from "./components/ChatInput";
import ChatMessages from "./components/ChatMessages";
import { Chatbot } from "supersimpledev";

function App() {
  const [chatMessages, setChatMessages] = useState(() => {
    const saved = localStorage.getItem("chatMessages");
    return saved ? JSON.parse(saved) : [];
  });
  const [inputTop, setInputTop] = useState(true);
  function switchInputText() {
    console.log("clicked");
    if (!inputTop) {
      setInputTop(true);
    } else {
      setInputTop(false);
    }
  }

  useEffect(() => {
    Chatbot.addResponses({
      goodbye: "Goodbye. Have a great day!",
      "give me a unique id": function () {
        return `Sure! Here's a unique ID: ${crypto.randomUUID()}`;
      },
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(chatMessages));
  }, [chatMessages]);

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

export default App;
