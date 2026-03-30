import { useState } from "react";
import { Search, Plus, MessageSquare } from "lucide-react";
import { chats } from "@/data/sampleData";
import ChatCard from "@/components/chat/ChatCard";
import { cn } from "@/lib/utils";

interface ChatSidebarProps {
  activeChatId: string | null;
  onSelectChat: (id: string) => void;
  className?: string;
}

const ChatSidebar = ({ activeChatId, onSelectChat, className }: ChatSidebarProps) => {
  const [search, setSearch] = useState("");

  const filtered = chats.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside className={cn("flex flex-col h-full bg-card border-r", className)}>
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-primary-foreground" />
            </div>
            <h1 className="text-lg font-bold tracking-tight">NexaChat</h1>
          </div>
          <button className="p-2 rounded-lg hover:bg-muted transition-colors">
            <Plus className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search chats..."
            className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-muted/60 border-0 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
        </div>
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-2 pb-2 space-y-0.5">
        {filtered.length > 0 ? (
          filtered.map((chat) => (
            <ChatCard
              key={chat.id}
              chat={chat}
              isActive={activeChatId === chat.id}
              onClick={() => onSelectChat(chat.id)}
            />
          ))
        ) : (
          <div className="text-center py-8 text-sm text-muted-foreground">
            No chats found
          </div>
        )}
      </div>
    </aside>
  );
};

export default ChatSidebar;
