import { useState, useRef, useEffect, useCallback, useImperativeHandle, forwardRef } from "react";
import { Send, Smile, Paperclip, Mic } from "lucide-react";
import { Message } from "@/data/sampleData";
import MessageBubble from "@/components/chat/MessageBubble";
import TypingIndicator from "@/components/chat/TypingIndicator";
import EmptyState from "@/components/chat/EmptyState";
import EmojiPicker from "@/components/chat/EmojiPicker";
import { cn } from "@/lib/utils";

export interface ChatAreaHandle {
  setInputText: (text: string) => void;
}

interface ChatAreaProps {
  chatId: string | null;
  messages: Message[];
  isTyping: boolean;
  onSendMessage: (text: string) => void;
  chatName?: string;
}

const ChatArea = forwardRef<ChatAreaHandle, ChatAreaProps>(({ chatId, messages, isTyping, onSendMessage, chatName }, ref) => {
  const [input, setInput] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    setInputText: (text: string) => {
      setInput(text);
      setTimeout(() => inputRef.current?.focus(), 50);
    },
  }));

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatId, messages, isTyping, scrollToBottom]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    onSendMessage(text);
    setInput("");
    setShowEmoji(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setInput(prev => prev + emoji);
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
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-muted-foreground">No messages yet. Say hi! 👋</p>
          </div>
        ) : (
          messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))
        )}
        {isTyping && <TypingIndicator name={chatName} />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-card/50 relative">
        {showEmoji && (
          <EmojiPicker
            onSelect={handleEmojiSelect}
            onClose={() => setShowEmoji(false)}
          />
        )}
        <div className="flex items-center gap-2 bg-muted/60 rounded-xl px-3 py-1.5">
          <button
            onClick={() => setShowEmoji(!showEmoji)}
            className={cn(
              "p-1.5 rounded-lg transition-colors",
              showEmoji ? "bg-primary/10 text-primary" : "hover:bg-background text-muted-foreground"
            )}
          >
            <Smile className="h-5 w-5" />
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
});

ChatArea.displayName = "ChatArea";

export default ChatArea;
