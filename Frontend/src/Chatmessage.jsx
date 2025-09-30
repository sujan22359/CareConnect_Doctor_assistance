import React from "react";

function ChatMessage({ text, sender }) {
  return (
    <div className={`message ${sender === "user" ? "user-message" : "bot-message"}`}>
      <span dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
}

export default ChatMessage;
