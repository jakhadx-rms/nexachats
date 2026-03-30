import { MessageSquare, Brain, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface EmptyStateProps {
  type: "no-chat" | "no-messages" | "no-memories";
}

const configs = {
  "no-chat": {
    icon: MessageSquare,
    title: "Select a conversation",
    description: "Choose a chat from the sidebar to start messaging",
  },
  "no-messages": {
    icon: MessageSquare,
    title: "No messages yet",
    description: "Send a message to start the conversation",
  },
  "no-memories": {
    icon: Brain,
    title: "No memories yet",
    description: "NexaChat will auto-detect important info from your chats",
  },
};

const EmptyState = ({ type }: EmptyStateProps) => {
  const config = configs[type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center h-full text-center px-6"
    >
      <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4 animate-float">
        <Icon className="h-7 w-7 text-muted-foreground" />
      </div>
      <h3 className="font-semibold text-lg">{config.title}</h3>
      <p className="text-sm text-muted-foreground mt-1 max-w-[240px]">{config.description}</p>
      {type === "no-chat" && (
        <div className="flex items-center gap-1.5 mt-4 text-xs text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          <span>AI-powered smart memories included</span>
        </div>
      )}
    </motion.div>
  );
};

export default EmptyState;
