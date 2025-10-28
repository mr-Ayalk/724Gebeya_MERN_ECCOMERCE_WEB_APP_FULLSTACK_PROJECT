// import React, { useState } from "react";
// import axios from "axios";
// import { X } from "lucide-react";

// export default function ChatWindow({ onClose }) {
//   const [messages, setMessages] = useState([
//     {
//       sender: "bot",
//       text: "👋 Hi! I'm your shopping assistant. How can I help today?",
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMsg = { sender: "user", text: input };
//     setMessages((prev) => [...prev, userMsg]);
//     setInput("");
//     setLoading(true);

//     try {
//       const res = await axios.post("http://localhost:8000/api/chat", {
//         message: userMsg.text,
//       });
//       const botMsg = { sender: "bot", text: res.data.reply };
//       setMessages((prev) => [...prev, botMsg]);
//     } catch (err) {
//       setMessages((prev) => [
//         ...prev,
//         { sender: "bot", text: "⚠️ Sorry, something went wrong." },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white w-80 h-96 rounded-2xl shadow-lg flex flex-col">
//       {/* Header */}
//       <div className="bg-indigo-600 text-white p-3 rounded-t-2xl flex justify-between items-center">
//         <span>Smart Assistant</span>
//         <button onClick={onClose}>
//           <X size={18} />
//         </button>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto p-3 space-y-2">
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className={`p-2 rounded-lg max-w-[80%] ${
//               msg.sender === "user"
//                 ? "bg-indigo-100 self-end ml-auto"
//                 : "bg-gray-100 self-start"
//             }`}
//           >
//             {msg.text}
//           </div>
//         ))}

//         {loading && (
//           <p className="text-sm text-gray-500">Assistant is typing...</p>
//         )}
//       </div>

//       {/* Input */}
//       <div className="p-2 border-t flex">
//         <input
//           type="text"
//           className="flex-1 border rounded-lg p-2 mr-2"
//           placeholder="Type your message..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-indigo-600 text-white px-3 rounded-lg"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import axios from "axios";
import { IoMdClose } from "react-icons/io";

export default function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hi! I'm your virtual shopping assistant. How can I help?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/api/chat", {
        message: userMsg.text,
      });
      const botMsg = { sender: "bot", text: res.data.reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white w-80 h-96 rounded-2xl shadow-2xl flex flex-col">
      {/* Header */}
      <div className="bg-indigo-600 text-white p-3 rounded-t-2xl flex justify-between items-center">
        <span className="font-medium">Smart Assistant</span>
        <button onClick={onClose} className="hover:text-gray-200">
          <IoMdClose size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg text-sm max-w-[80%] ${
              msg.sender === "user"
                ? "bg-indigo-100 self-end ml-auto"
                : "bg-gray-100 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <p className="text-xs text-gray-500 italic">Assistant is typing...</p>
        )}
      </div>

      {/* Input */}
      <div className="p-2 border-t flex">
        <input
          type="text"
          className="flex-1 border rounded-lg p-2 mr-2 text-sm"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-indigo-600 text-white px-3 rounded-lg text-sm hover:bg-indigo-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
