import { useState } from "react";
import { Brain, FileText, ListChecks, Zap, Plus, X, Sparkles } from "lucide-react";
import { memories, smartReplies, chatSummary } from "@/data/sampleData";
import MemoryCard from "@/components/chat/MemoryCard";
import AIActionCard from "@/components/chat/AIActionCard";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface AIPanelProps {
  className?: string;
  onClose?: () => void;
}

const AIPanel = ({ className, onClose }: AIPanelProps) => {
  const [activeTab, setActiveTab] = useState<"memory" | "ai">("memory");
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
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <h2 className="font-semibold text-sm">AI Assistant</h2>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-md transition-colors">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        {(["memory", "ai"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 py-2.5 text-xs font-medium transition-colors relative",
              activeTab === tab ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab === "memory" ? "Smart Memory" : "AI Actions"}
            {activeTab === tab && (
              <motion.div layoutId="tab-underline" className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-3">
        <AnimatePresence mode="wait">
          {activeTab === "memory" ? (
            <motion.div key="memory" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Detected Memories ({memories.length})
                </span>
                <button className="p-1 hover:bg-muted rounded-md transition-colors">
                  <Plus className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
              </div>
              {memories.map((mem) => (
                <MemoryCard key={mem.id} memory={mem} />
              ))}
            </motion.div>
          ) : (
            <motion.div key="ai" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
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

              {/* Results */}
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
