import { useState } from "react";
import ChatSidebar from "@/components/layout/ChatSidebar";
import TopBar from "@/components/layout/TopBar";
import ChatArea from "@/components/layout/ChatArea";
import AIPanel from "@/components/layout/AIPanel";
import GuestBanner from "@/components/layout/GuestBanner";
import { useChatStore } from "@/hooks/useChatStore";
import { cn } from "@/lib/utils";

const Index = () => {
  const {
    chatsMeta,
    activeChatId,
    activeChat,
    activeMessages,
    isTyping,
    typingChatId,
    selectChat,
    sendMessage,
    clearStorage,
  } = useChatStore();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [mobileShowChat, setMobileShowChat] = useState(false);

  const handleSelectChat = (id: string) => {
    selectChat(id);
    setMobileShowChat(true);
    if (window.innerWidth < 1024) setSidebarOpen(false);
  };

  const handleBackToList = () => {
    setMobileShowChat(false);
    setSidebarOpen(true);
  };

  const handleSendMessage = (text: string) => {
    if (activeChatId) {
      sendMessage(activeChatId, text);
    }
  };

  return (
    <div className="h-dvh flex flex-col bg-background overflow-hidden">
      <GuestBanner />
      <div className="flex-1 flex min-h-0">
        {/* Sidebar */}
        <div
          className={cn(
            "shrink-0 transition-all duration-300",
            "lg:w-80 lg:block",
            "max-lg:absolute max-lg:inset-0 max-lg:z-30",
            mobileShowChat ? "max-lg:hidden" : "max-lg:block max-lg:w-full",
            !sidebarOpen && "lg:w-0 lg:overflow-hidden"
          )}
        >
          <ChatSidebar
            chats={chatsMeta}
            activeChatId={activeChatId}
            onSelectChat={handleSelectChat}
            onClearStorage={clearStorage}
            typingChatId={typingChatId}
            className={cn(!sidebarOpen && "lg:opacity-0")}
          />
        </div>

        {/* Main chat area */}
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
            <ChatArea
              chatId={activeChatId}
              messages={activeMessages}
              isTyping={isTyping}
              onSendMessage={handleSendMessage}
              chatName={activeChat?.name.split(" ")[0]}
            />
          </div>
        </div>

        {/* AI Panel */}
        {aiPanelOpen && (
          <>
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
