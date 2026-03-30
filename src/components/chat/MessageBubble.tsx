import { Message } from "@/data/sampleData";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface MessageBubbleProps {
  message: Message;
}

const memoryLabels: Record<string, { label: string; emoji: string }> = {
  birthday: { label: "Birthday", emoji: "🎂" },
  task: { label: "Task", emoji: "✅" },
  deadline: { label: "Deadline", emoji: "📅" },
  event: { label: "Event", emoji: "📌" },
};

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isSent = message.sender === "me";
  const memory = message.isMemory && message.memoryType ? memoryLabels[message.memoryType] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn("flex mb-3", isSent ? "justify-end" : "justify-start")}
    >
      <div className={cn("max-w-[75%] relative group")}>
        {memory && (
          <div className="flex items-center gap-1.5 mb-1">
            <Sparkles className="h-3 w-3 text-accent" />
            <span className="text-[10px] font-medium text-accent">
              {memory.emoji} {memory.label} detected
            </span>
          </div>
        )}
        <div
          className={cn(
            "px-4 py-2.5 rounded-2xl text-sm leading-relaxed",
            isSent
              ? "bg-sent text-sent-foreground rounded-br-md"
              : "bg-received text-received-foreground rounded-bl-md",
            memory && "ring-1 ring-accent/30"
          )}
        >
          {message.text}
        </div>
        <span
          className={cn(
            "text-[10px] text-muted-foreground mt-1 block",
            isSent ? "text-right" : "text-left"
          )}
        >
          {message.timestamp}
        </span>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
