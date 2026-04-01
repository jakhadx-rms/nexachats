import { useState } from "react";
import { Database, Bell, Clock, CheckCircle2, AlertCircle, Sparkles, Eye, EyeOff } from "lucide-react";
import { memoryTimeline, smartReminders, MemoryTimeline } from "@/data/sampleData";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const typeIcon = {
  "auto-capture": Sparkles,
  reminder: Bell,
  pattern: Database,
};

const importanceColor = {
  high: "border-l-destructive",
  medium: "border-l-accent",
  low: "border-l-muted-foreground/30",
};

const statusConfig = {
  upcoming: { color: "text-primary", bg: "bg-primary/10", label: "Upcoming" },
  overdue: { color: "text-destructive", bg: "bg-destructive/10", label: "Overdue" },
  completed: { color: "text-emerald-500", bg: "bg-emerald-500/10", label: "Done" },
};

const MemoryEngineTab = () => {
  const [acknowledged, setAcknowledged] = useState<Set<string>>(
    new Set(memoryTimeline.filter((m) => m.acknowledged).map((m) => m.id))
  );
  const [view, setView] = useState<"timeline" | "reminders">("timeline");

  const toggleAck = (id: string) => {
    setAcknowledged((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const unackCount = memoryTimeline.filter((m) => !acknowledged.has(m.id)).length;

  return (
    <motion.div
      key="memory-engine"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      {/* Sub-nav */}
      <div className="flex gap-1 p-1 bg-muted/50 rounded-lg">
        {(["timeline", "reminders"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={cn(
              "flex-1 py-1.5 text-[11px] font-medium rounded-md transition-all",
              view === v
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {v === "timeline" ? `Timeline${unackCount > 0 ? ` (${unackCount})` : ""}` : `Reminders (${smartReminders.length})`}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {view === "timeline" ? (
          <motion.div key="tl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Auto-Captured
              </span>
            </div>

            {memoryTimeline.map((item) => {
              const Icon = typeIcon[item.type];
              const isAck = acknowledged.has(item.id);

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    "rounded-lg border border-l-[3px] p-3 transition-all group",
                    importanceColor[item.importance],
                    isAck ? "opacity-60" : ""
                  )}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 rounded-md bg-primary/10 shrink-0 mt-0.5">
                      <Icon className="h-3 w-3 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className={cn("text-xs font-semibold", isAck && "line-through")}>{item.title}</h4>
                        <button
                          onClick={() => toggleAck(item.id)}
                          className="p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                          title={isAck ? "Mark as unread" : "Acknowledge"}
                        >
                          {isAck ? (
                            <EyeOff className="h-3 w-3 text-muted-foreground" />
                          ) : (
                            <Eye className="h-3 w-3 text-muted-foreground" />
                          )}
                        </button>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{item.description}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[10px] text-muted-foreground">{item.timestamp}</span>
                        <span className="text-[10px] text-primary font-medium">• {item.sourceChat}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div key="rem" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <Bell className="h-3.5 w-3.5 text-accent" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Smart Reminders
              </span>
            </div>

            {smartReminders.map((rem) => {
              const status = statusConfig[rem.status];
              return (
                <motion.div
                  key={rem.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border p-3 hover:border-primary/20 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-xs font-semibold">{rem.title}</h4>
                    <span className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded-full", status.bg, status.color)}>
                      {status.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1.5">
                    <div className="flex items-center gap-1">
                      <Clock className="h-2.5 w-2.5 text-muted-foreground" />
                      <span className="text-[10px] text-muted-foreground">{rem.dueDate}</span>
                    </div>
                    <span className="text-[10px] text-primary font-medium">{rem.relatedPerson}</span>
                    {rem.autoDetected && (
                      <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-primary/10 text-primary flex items-center gap-0.5">
                        <Sparkles className="h-2 w-2" /> Auto
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MemoryEngineTab;
