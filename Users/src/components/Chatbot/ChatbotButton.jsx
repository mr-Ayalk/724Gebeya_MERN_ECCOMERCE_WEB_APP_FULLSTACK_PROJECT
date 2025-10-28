import React, { useState } from "react";

import { MessageCircle } from "lucide-react";
import ChatWindow from "./ChatWindow";

export default function ChatbotButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition"
        >
          <MessageCircle size={28} />
        </button>
      )}
      {open && <ChatWindow onClose={() => setOpen(false)} />}
    </div>
  );
}
