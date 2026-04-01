import { Bell, Menu, ChevronLeft, Phone, Video, MoreVertical, User, Settings, LogOut, Sparkles } from "lucide-react";
import { Chat } from "@/data/sampleData";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
          <button onClick={onToggleSidebar} className="p-2 rounded-lg hover:bg-muted transition-colors">
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
                {chat.online ? (
                  <span className="text-emerald-500">● Online</span>
                ) : chat.isGroup ? (
                  `${Math.floor(Math.random() * 10 + 3)} members`
                ) : (
                  chat.lastSeen || "Last seen recently"
                )}
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="ml-2 focus:outline-none">
              <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-transparent hover:ring-primary/30 transition-all">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                  YO
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <div className="px-2 py-2">
              <p className="text-sm font-medium">Your Name</p>
              <p className="text-xs text-muted-foreground">you@nexachat.com</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopBar;
