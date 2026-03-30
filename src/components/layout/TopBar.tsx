import { Bell, Menu, ChevronLeft, Phone, Video, MoreVertical } from "lucide-react";
import { Chat } from "@/data/sampleData";
import { cn } from "@/lib/utils";

interface TopBarProps {
  chat: Chat | null;
  onToggleSidebar?: () => void;
  onToggleAI?: () => void;
  showBackButton?: boolean;
}

const TopBar = ({ chat, onToggleSidebar, onToggleAI, showBackButton }: TopBarProps) => {
  return (
    <header className="h-16 border-b bg-card/80 backdrop-blur-sm flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-3">
        {showBackButton && (
          <button onClick={onToggleSidebar} className="p-2 rounded-lg hover:bg-muted transition-colors lg:hidden">
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
        <button onClick={onToggleSidebar} className="p-2 rounded-lg hover:bg-muted transition-colors hidden lg:flex">
          <Menu className="h-5 w-5 text-muted-foreground" />
        </button>

        {chat && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
              {chat.avatar}
            </div>
            <div>
              <h2 className="text-sm font-semibold leading-tight">{chat.name}</h2>
              <span className="text-xs text-muted-foreground">
                {chat.online ? "Online" : chat.isGroup ? `${Math.floor(Math.random() * 10 + 3)} members` : "Last seen recently"}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1">
        <button className="p-2 rounded-lg hover:bg-muted transition-colors">
          <Phone className="h-4 w-4 text-muted-foreground" />
        </button>
        <button className="p-2 rounded-lg hover:bg-muted transition-colors">
          <Video className="h-4 w-4 text-muted-foreground" />
        </button>
        <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
        </button>
        <button onClick={onToggleAI} className="p-2 rounded-lg hover:bg-muted transition-colors">
          <MoreVertical className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
};

export default TopBar;
