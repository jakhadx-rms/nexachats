import { useState } from "react";
import { Brain, Database, Users, X, Sparkles, FileText, ListChecks, Zap } from "lucide-react";
import { smartReplies, chatSummary } from "@/data/sampleData";
import AIActionCard from "@/components/chat/AIActionCard";
import SecondBrainTab from "@/components/ai/SecondBrainTab";
import MemoryEngineTab from "@/components/ai/MemoryEngineTab";
import ContextSystemTab from "@/components/ai/ContextSystemTab";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface AIPanelProps {
  className?: string;
  onClose?: () => void;
  onSmartReply?: (text: string) => void;
}

type TabKey = "brain" | "memory" | "context" | "actions";

const tabs: { key: TabKey; label: string; icon: React.ElementType }[] = [
  { key: "brain", label: "Brain", icon: Brain },
  { key: "memory", label: "Memory", icon: Database },
  { key: "context", label: "Context", icon: Users },
  { key: "actions", label: "Actions", icon: Zap },
];

const AIPanel = ({ className, onClose, onSmartReply }: AIPanelProps) => {
  const [activeTab, setActiveTab] = useState<TabKey>("brain");
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [summaryVisible, setSummaryVisible] = useState(false);
  const [tasksVisible, setTasksVisible] = useState(false);
  const [repliesVisible, setRepliesVisible] = useState(false);

  const handleAction = (action: string) => {
    setLoadingAction(action);
    setTimeout(() => {
      setLoadingAction(null);
      if (action === "summarize") setSummaryVisible(true);
      if (action === "tasks") setTasksVisible(true);
      if (action === "replies") setRepliesVisible(true);
    }, 1500);
  };

  return (
    <aside className={cn("flex flex-col h-full bg-card border-l", className)}>
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold text-sm leading-tight">AI Assistant</h2>
            <p className="text-[10px] text-muted-foreground">Second Brain • Memory • Context</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-md transition-colors">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "flex-1 py-2.5 flex flex-col items-center gap-1 transition-colors relative",
                activeTab === tab.key
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              <span className="text-[10px] font-medium">{tab.label}</span>
              {activeTab === tab.key && (
                <motion.div
                  layoutId="ai-tab-underline"
                  className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-4">
        <AnimatePresence mode="wait">
          {activeTab === "brain" && <SecondBrainTab />}
          {activeTab === "memory" && <MemoryEngineTab />}
          {activeTab === "context" && <ContextSystemTab />}
          {activeTab === "actions" && (
            <motion.div key="actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Quick Actions
              </span>

              <AIActionCard
                icon={FileText}
                title="Summarize Chat"
                description="Get a concise summary of this conversation"
                onClick={() => handleAction("summarize")}
                loading={loadingAction === "summarize"}
              />
              <AIActionCard
                icon={ListChecks}
                title="Extract Tasks"
                description="Find action items and to-dos"
                onClick={() => handleAction("tasks")}
                loading={loadingAction === "tasks"}
              />
              <AIActionCard
                icon={Zap}
                title="Smart Replies"
                description="AI-suggested responses"
                onClick={() => handleAction("replies")}
                loading={loadingAction === "replies"}
              />

              <AnimatePresence>
                {summaryVisible && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="rounded-xl border bg-primary/5 p-3.5">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <h4 className="text-sm font-semibold">Chat Summary</h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{chatSummary}</p>
                  </motion.div>
                )}
                {tasksVisible && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="rounded-xl border bg-primary/5 p-3.5 space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                      <ListChecks className="h-4 w-4 text-primary" />
                      <h4 className="text-sm font-semibold">Extracted Tasks</h4>
                    </div>
                    {["Submit report by Wednesday", "Organize team birthday celebration", "Complete frontend project by March 21st"].map((t, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-4 h-4 rounded border border-primary/40 shrink-0" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
                {repliesVisible && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Zap className="h-4 w-4 text-primary" />
                      <h4 className="text-sm font-semibold">Smart Replies</h4>
                    </div>
                    {smartReplies.map((reply, i) => (
                      <button
                        key={i}
                        onClick={() => onSmartReply?.(reply)}
                        className="w-full text-left text-xs px-3 py-2.5 rounded-lg border hover:border-primary/30 hover:bg-primary/5 transition-all"
                      >
                        {reply}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
};

export default AIPanel;
