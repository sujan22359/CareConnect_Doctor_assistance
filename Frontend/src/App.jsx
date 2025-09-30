import React, { useState, useEffect, useRef } from "react";

const API_URL = "http://127.0.0.1:8000/get_doctor"; // Change when deployed

function App() {
  const [messages, setMessages] = useState([
    { text: "👋 Hi! Tell me your symptoms and I’ll suggest nearby doctors.", from: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const messagesEndRef = useRef(null); // 🔥 reference to bottom of messages

  // ✅ Auto-scroll when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Detect user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        const data = await res.json();

        const city =
          data.address.suburb ||
          data.address.village ||
          data.address.town ||
          data.address.city;
        const state = data.address.state;

        setUserLocation(`${city}, ${state}`);
      });
    }
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, from: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch(
        `${API_URL}?symptom=${encodeURIComponent(input)}&location=${encodeURIComponent(userLocation)}`,
        { method: "GET" }
      );

      if (!response.ok) throw new Error("Backend error");

      const data = await response.json();

      if (data.suggestions && data.suggestions.length > 0) {
        setMessages((prev) => [
          ...prev,
          { text: `🩺 Suggested Specialist: ${data.specialization}`, from: "bot" }
        ]);

        data.suggestions.forEach((doc) => {
          setMessages((prev) => [
            ...prev,
            {
              text: `🏥 ${doc.name}\n📍 ${doc.lat}, ${doc.lon}\n👨‍⚕️ ${doc.specialization}\n📞 ${doc.contact}`,
              from: "bot"
            }
          ]);
        });
      } else {
        setMessages((prev) => [
          ...prev,
          { text: "😔 Sorry, I couldn't find any nearby hospitals.", from: "bot" }
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: "⚠️ Error connecting to backend.", from: "bot" }
      ]);
    }
  };

  return (
    <div className="chat-container" style={{ maxHeight: "80vh", overflowY: "auto" }}>
      <div className="messages">
        {messages.map((m, idx) => (
          <div key={idx} className={`message ${m.from}`}>
            {m.text}
          </div>
        ))}
        {/* 🔥 This invisible div forces scroll to bottom */}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-box">
        <input
          type="text"
          placeholder="Type your symptom..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
