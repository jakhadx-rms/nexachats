import { Chat } from "@/data/sampleData";
import { Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatCardProps {
  chat: Chat;
  isActive: boolean;
  onClick: () => void;
}

const ChatCard = ({ chat, isActive, onClick }: ChatCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-left group",
        isActive
          ? "bg-primary/10 border border-primary/20"
          : "hover:bg-muted/60 border border-transparent"
      )}
    >
      <div className="relative shrink-0">
        <div
          className={cn(
            "w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold",
            isActive
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          )}
        >
          {chat.isGroup ? <Users className="h-4 w-4" /> : chat.avatar}
        </div>
        {chat.online && !chat.isGroup && (
          <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-background rounded-full" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="font-medium text-sm truncate">{chat.name}</span>
          <span className="text-[11px] text-muted-foreground shrink-0 ml-2">
            {chat.timestamp}
          </span>
        </div>
        <p className="text-xs text-muted-foreground truncate mt-0.5">
          {chat.lastMessage}
        </p>
      </div>

      {chat.unread > 0 && (
        <span className="shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
          {chat.unread}
        </span>
      )}
    </button>
  );
};

export default ChatCard;
