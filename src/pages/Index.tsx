import { useState } from "react";
import ChatSidebar from "@/components/layout/ChatSidebar";
import TopBar from "@/components/layout/TopBar";
import ChatArea from "@/components/layout/ChatArea";
import AIPanel from "@/components/layout/AIPanel";
import GuestBanner from "@/components/layout/GuestBanner";
import { chats } from "@/data/sampleData";
import { cn } from "@/lib/utils";

const Index = () => {
  const [activeChatId, setActiveChatId] = useState<string | null>("1");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [aiPanelOpen, setAiPanelOpen] = useState(true);

  const activeChat = chats.find((c) => c.id === activeChatId) || null;

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <GuestBanner />
      <div className="flex-1 flex min-h-0">
        {/* Sidebar */}
        <div
          className={cn(
            "transition-all duration-300 shrink-0",
            sidebarOpen ? "w-80" : "w-0",
            "max-lg:absolute max-lg:z-30 max-lg:h-full max-lg:shadow-xl",
            !sidebarOpen && "max-lg:pointer-events-none"
          )}
        >
          <ChatSidebar
            activeChatId={activeChatId}
            onSelectChat={(id) => {
              setActiveChatId(id);
              if (window.innerWidth < 1024) setSidebarOpen(false);
            }}
            className={cn(!sidebarOpen && "opacity-0")}
          />
        </div>

        {/* Main area */}
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar
            chat={activeChat}
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            onToggleAI={() => setAiPanelOpen(!aiPanelOpen)}
            showBackButton={!sidebarOpen}
          />
          <div className="flex-1 min-h-0">
            <ChatArea chatId={activeChatId} />
          </div>
        </div>

        {/* AI Panel */}
        <div
          className={cn(
            "transition-all duration-300 shrink-0",
            aiPanelOpen ? "w-80" : "w-0",
            "max-xl:absolute max-xl:right-0 max-xl:z-30 max-xl:h-full max-xl:shadow-xl",
            !aiPanelOpen && "max-xl:pointer-events-none"
          )}
        >
          <AIPanel
            className={cn(!aiPanelOpen && "opacity-0")}
            onClose={() => setAiPanelOpen(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
