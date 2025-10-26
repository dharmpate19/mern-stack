import ChatMessage from './ChatMessage'

import {useRef, useEffect} from "react"

function ChatMessages({ chatMessages }) {
        const chatMessagesRef = useRef(null)
        useEffect(() => {
          const containerElemn = chatMessagesRef.current;
          if(containerElemn) {
          containerElemn.scrollTop = containerElemn.scrollHeight;
          }
        }, [chatMessages]);

        
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

      export default ChatMessages;