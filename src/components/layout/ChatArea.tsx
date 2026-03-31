import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Smile, Paperclip, Mic } from "lucide-react";
import { messages as sampleMessages, Message } from "@/data/sampleData";
import MessageBubble from "@/components/chat/MessageBubble";
import TypingIndicator from "@/components/chat/TypingIndicator";
import EmptyState from "@/components/chat/EmptyState";
import { cn } from "@/lib/utils";

interface ChatAreaProps {
  chatId: string | null;
}

const ChatArea = ({ chatId }: ChatAreaProps) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [showTyping, setShowTyping] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatId, messages, scrollToBottom]);

  useEffect(() => {
    const timer = setTimeout(() => setShowTyping(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!chatId) {
    return <EmptyState type="no-chat" />;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-1">
        <div className="text-center mb-6">
          <span className="text-[11px] text-muted-foreground bg-muted px-3 py-1 rounded-full">
            Today
          </span>
        </div>
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {showTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-card/50">
        <div className="flex items-center gap-2 bg-muted/60 rounded-xl px-3 py-1.5">
          <button className="p-1.5 hover:bg-background rounded-lg transition-colors">
            <Smile className="h-5 w-5 text-muted-foreground" />
          </button>
          <button className="p-1.5 hover:bg-background rounded-lg transition-colors">
            <Paperclip className="h-5 w-5 text-muted-foreground" />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 bg-transparent border-0 text-sm py-2 focus:outline-none placeholder:text-muted-foreground/50"
          />
          {input.trim() ? (
            <button onClick={handleSend} className="p-2 bg-primary rounded-lg hover:bg-primary/90 transition-colors">
              <Send className="h-4 w-4 text-primary-foreground" />
            </button>
          ) : (
            <button className="p-2 hover:bg-background rounded-lg transition-colors">
              <Mic className="h-5 w-5 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
