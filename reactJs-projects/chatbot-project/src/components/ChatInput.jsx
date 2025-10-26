import { useState } from "react";
import {Chatbot} from "supersimpledev";


function ChatInput({ chatMessages, setChatMessages }) {
        const [inputText, setInputText] = useState("");
        const [isLoading, setIsLoading] = useState("");
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

export default ChatInput;