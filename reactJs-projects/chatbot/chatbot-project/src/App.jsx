import { useState } from 'react'
import './App.css'
import ChatInput from "./components/ChatInput";
import ChatMessages from "./components/ChatMessages"

function App() {
  const [chatMessages, setChatMessages] = useState([]);
        const [inputTop, setInputTop] = useState(true);
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

export default App
