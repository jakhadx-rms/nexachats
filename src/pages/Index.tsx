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
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  // On mobile, show chat list by default; selecting a chat hides the list
  const [mobileShowChat, setMobileShowChat] = useState(false);

  const activeChat = chats.find((c) => c.id === activeChatId) || null;

  const handleSelectChat = (id: string) => {
    setActiveChatId(id);
    setMobileShowChat(true);
    if (window.innerWidth < 1024) setSidebarOpen(false);
  };

  const handleBackToList = () => {
    setMobileShowChat(false);
    setSidebarOpen(true);
  };

  return (
    <div className="h-dvh flex flex-col bg-background overflow-hidden">
      <GuestBanner />
      <div className="flex-1 flex min-h-0">
        {/* Sidebar - full screen on mobile, fixed width on desktop */}
        <div
          className={cn(
            "shrink-0 transition-all duration-300",
            // Desktop
            "lg:w-80 lg:block",
            // Mobile: full width when visible, hidden when viewing a chat
            "max-lg:absolute max-lg:inset-0 max-lg:z-30",
            mobileShowChat ? "max-lg:hidden" : "max-lg:block max-lg:w-full",
            // Desktop sidebar toggle
            !sidebarOpen && "lg:w-0 lg:overflow-hidden"
          )}
        >
          <ChatSidebar
            activeChatId={activeChatId}
            onSelectChat={handleSelectChat}
            className={cn(!sidebarOpen && "lg:opacity-0")}
          />
        </div>

        {/* Main chat area - hidden on mobile when no chat selected */}
        <div
          className={cn(
            "flex-1 flex flex-col min-w-0",
            !mobileShowChat && "max-lg:hidden"
          )}
        >
          <TopBar
            chat={activeChat}
            onToggleSidebar={() => {
              if (window.innerWidth < 1024) {
                handleBackToList();
              } else {
                setSidebarOpen(!sidebarOpen);
              }
            }}
            onToggleAI={() => setAiPanelOpen(!aiPanelOpen)}
            showBackButton={mobileShowChat}
          />
          <div className="flex-1 min-h-0">
            <ChatArea chatId={activeChatId} />
          </div>
        </div>

        {/* AI Panel - overlay on mobile/tablet, side panel on xl+ */}
        {aiPanelOpen && (
          <>
            {/* Backdrop on mobile */}
            <div
              className="fixed inset-0 bg-black/40 z-30 xl:hidden"
              onClick={() => setAiPanelOpen(false)}
            />
            <div
              className={cn(
                "shrink-0 z-40",
                "xl:w-80 xl:relative",
                "max-xl:fixed max-xl:right-0 max-xl:top-0 max-xl:bottom-0 max-xl:w-[85vw] max-xl:max-w-80 max-xl:shadow-xl"
              )}
            >
              <AIPanel onClose={() => setAiPanelOpen(false)} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
